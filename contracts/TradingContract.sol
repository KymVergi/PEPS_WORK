// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PeptidePerpsTrading
 * @notice Perpetual trading contract for $PEPS
 * @dev Example implementation - NEEDS SECURITY AUDIT BEFORE DEPLOYMENT
 */
contract PeptidePerpsTrading is ReentrancyGuard, Ownable {
    
    struct Position {
        uint256 id;
        address trader;
        bool isLong;
        uint256 size;
        uint256 collateral;
        uint256 leverage;
        uint256 entryPrice;
        uint256 liquidationPrice;
        bool isOpen;
        uint256 openedAt;
    }

    IERC20 public pepsToken;
    address public oracleAddress;
    
    uint256 public nextPositionId = 1;
    uint256 public constant MAX_LEVERAGE = 5;
    uint256 public constant FEE_BASIS_POINTS = 10; // 0.1%
    
    mapping(uint256 => Position) public positions;
    mapping(address => uint256[]) public userPositions;
    
    event PositionOpened(
        uint256 indexed positionId,
        address indexed trader,
        bool isLong,
        uint256 size,
        uint256 leverage
    );
    
    event PositionClosed(
        uint256 indexed positionId,
        address indexed trader,
        uint256 pnl
    );

    constructor(address _pepsToken, address _oracle) {
        pepsToken = IERC20(_pepsToken);
        oracleAddress = _oracle;
    }

    /**
     * @notice Open a new position
     * @param isLong True for long, false for short
     * @param collateralAmount Amount of collateral
     * @param leverage Leverage multiplier (2-5x)
     */
    function openPosition(
        bool isLong,
        uint256 collateralAmount,
        uint256 leverage
    ) external nonReentrant returns (uint256) {
        require(leverage >= 2 && leverage <= MAX_LEVERAGE, "Invalid leverage");
        require(collateralAmount > 0, "Collateral required");

        // Transfer collateral
        require(
            pepsToken.transferFrom(msg.sender, address(this), collateralAmount),
            "Transfer failed"
        );

        // Get current oracle price
        uint256 currentPrice = _getOraclePrice();
        
        // Calculate position size
        uint256 positionSize = collateralAmount * leverage;
        
        // Calculate liquidation price
        uint256 liquidationPrice = isLong
            ? currentPrice - (currentPrice / leverage)
            : currentPrice + (currentPrice / leverage);

        // Create position
        Position memory newPosition = Position({
            id: nextPositionId,
            trader: msg.sender,
            isLong: isLong,
            size: positionSize,
            collateral: collateralAmount,
            leverage: leverage,
            entryPrice: currentPrice,
            liquidationPrice: liquidationPrice,
            isOpen: true,
            openedAt: block.timestamp
        });

        positions[nextPositionId] = newPosition;
        userPositions[msg.sender].push(nextPositionId);

        emit PositionOpened(
            nextPositionId,
            msg.sender,
            isLong,
            positionSize,
            leverage
        );

        nextPositionId++;
        return nextPositionId - 1;
    }

    /**
     * @notice Close an existing position
     * @param positionId ID of position to close
     */
    function closePosition(uint256 positionId) external nonReentrant {
        Position storage position = positions[positionId];
        
        require(position.trader == msg.sender, "Not position owner");
        require(position.isOpen, "Position already closed");

        uint256 currentPrice = _getOraclePrice();
        
        // Calculate PnL
        int256 pnl = _calculatePnL(position, currentPrice);
        
        // Calculate fees
        uint256 fee = (position.size * FEE_BASIS_POINTS) / 10000;
        
        // Close position
        position.isOpen = false;
        
        // Return collateral ± PnL - fees
        uint256 payout;
        if (pnl >= 0) {
            payout = position.collateral + uint256(pnl) - fee;
        } else {
            uint256 loss = uint256(-pnl);
            require(loss < position.collateral, "Position liquidated");
            payout = position.collateral - loss - fee;
        }

        require(
            pepsToken.transfer(msg.sender, payout),
            "Transfer failed"
        );

        emit PositionClosed(positionId, msg.sender, uint256(pnl));
    }

    /**
     * @notice Get all positions for a user
     * @param user Address of user
     */
    function getUserPositions(address user) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return userPositions[user];
    }

    /**
     * @notice Get position details
     * @param positionId ID of position
     */
    function getPosition(uint256 positionId) 
        external 
        view 
        returns (Position memory) 
    {
        return positions[positionId];
    }

    /**
     * @dev Calculate PnL for a position
     */
    function _calculatePnL(Position memory position, uint256 currentPrice) 
        internal 
        pure 
        returns (int256) 
    {
        if (position.isLong) {
            int256 priceDiff = int256(currentPrice) - int256(position.entryPrice);
            return (priceDiff * int256(position.size)) / int256(position.entryPrice);
        } else {
            int256 priceDiff = int256(position.entryPrice) - int256(currentPrice);
            return (priceDiff * int256(position.size)) / int256(position.entryPrice);
        }
    }

    /**
     * @dev Get price from oracle (placeholder)
     */
    function _getOraclePrice() internal view returns (uint256) {
        // TODO: Implement actual oracle integration
        // For now, returning mock price
        return 1247 * 1e18; // $1247.00
    }

    /**
     * @notice Update oracle address (only owner)
     */
    function setOracle(address _oracle) external onlyOwner {
        oracleAddress = _oracle;
    }
}
