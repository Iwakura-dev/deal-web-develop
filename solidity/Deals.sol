// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// https://github.com/tronprotocol/tron-contracts/blob/master/contracts/tokens/TRC20/ITRC20.sol
import './interfaces/ITRC20.sol';

contract Deals {
    enum DealState {TakerWaiting, ArbiterWaiting, InProgress, InReview, InDispute, Done, Resolved, Canceled}
    event TakerWaiting(address indexed recipient, uint dealId);
    event ArbiterWaiting(address indexed recipient, uint dealId);
    event InProgress(address indexed recipient, uint dealId);
    event InReview(address indexed recipient, uint dealId);
    event InDispute(address indexed recipient, uint dealId);
    event Done(address indexed recipient, uint dealId);
    event Resolved(address indexed recipient, uint dealId, uint amountToTaker, uint amount);
    event Canceled(address indexed recipient, uint dealId, DealRole role, address initiatorAddress);


    enum DealRole {Maker, Taker, Arbiter}
    uint constant MAKER_FILTER = 1;
    uint constant TAKER_FILTER = 2;
    uint constant ARBITER_FILTER = 4;

    struct FeeInfo {
        uint arbiterFeeInNormal;
        uint arbiterFeeInDispute;
        uint arbiterSentToTaker;
    }

    struct DealInfo {
        uint id;
        uint createdAt;
        string terms;
        address maker;
        address taker;
        address arbiter;
        address token;
        uint amount;
        FeeInfo feeInfo;
        uint totalAmount;
        DealState state;
    }

    address public owner;
    bool public isActive;
    uint public activeDeals;
    mapping(uint => DealInfo) public deals;
    mapping(address => uint[]) private dealsByAddress;


    modifier onlyOwner() {
        require(owner == msg.sender, "Caller is not the owner");
        _;
    }

    modifier onlyActive() {
        require(isActive, "Contract is not activated");
        _;
    }

    modifier onlyOnState(uint dealId, DealState state) {
        require(deals[dealId].state == state, "This action is not allowed in this deal state");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function filter(DealInfo memory deal, address addr, uint roleFilter, DealState[] memory states) private pure returns (bool){
        bool forResult;
        uint i;
        if (roleFilter != 0) {
            forResult = false;
            if (roleFilter & MAKER_FILTER > 0 && deal.maker == addr) {
                forResult = true;
            } else if (roleFilter & TAKER_FILTER > 0 && deal.taker == addr) {
                forResult = true;
            } else if (roleFilter & ARBITER_FILTER > 0 && deal.arbiter == addr) {
                forResult = true;
            }

            if (!forResult) {
                return false;
            }
        }
        if (states.length > 0) {
            forResult = false;
            for (i = 0; i < states.length; i++) {
                if (states[i] == deal.state) {
                    forResult = true;
                }
            }
            if (!forResult) {
                return false;
            }
        }
        return true;
    }

    function getDeals(address addr, DealRole[] memory roles, DealState[] memory states, uint offset, uint limit) external view returns (DealInfo[] memory) {
        uint[] memory ids = dealsByAddress[addr];
        DealInfo[] memory result = new DealInfo[](min(limit, ids.length));

        uint id;
        uint skipped = 0;
        uint roleFilter = 0;
        uint i;
        uint cnt = 0;
        for (i = 0; i < roles.length; i++) {
            if (roles[i] == DealRole.Maker) {
                roleFilter |= MAKER_FILTER;
            } else if (roles[i] == DealRole.Taker) {
                roleFilter |= TAKER_FILTER;
            } else if (roles[i] == DealRole.Arbiter) {
                roleFilter |= ARBITER_FILTER;
            }
        }
        if (ids.length > 0) {
            for (i = ids.length - 1; true; i--) {
                id = ids[i];
                DealInfo memory deal = deals[id];
                if (filter(deal, addr, roleFilter, states)) {
                    if (++skipped > offset) {
                        result[cnt++] = deal;
                        if (limit <= cnt) {
                            break;
                        }
                    }
                }
                if (i == 0) {
                    break;
                }
            }
        }

        DealInfo[] memory trimmedResult = new DealInfo[](cnt);
        for (i = 0; i < cnt; i++) {
            trimmedResult[i] = result[i];
        }

        return trimmedResult;
    }

    function getDealsCount(address addr, DealRole[] memory roles, DealState[] memory states) external view returns (uint) {
        uint[] memory ids = dealsByAddress[addr];
        uint result = 0;

        uint id;
        uint roleFilter = 0;
        uint i;
        for (i = 0; i < roles.length; i++) {
            if (roles[i] == DealRole.Maker) {
                roleFilter |= MAKER_FILTER;
            } else if (roles[i] == DealRole.Taker) {
                roleFilter |= TAKER_FILTER;
            } else if (roles[i] == DealRole.Arbiter) {
                roleFilter |= ARBITER_FILTER;
            }
        }
        if (ids.length > 0) {
            for (i = ids.length - 1; true; i--) {
                id = ids[i];
                DealInfo memory deal = deals[id];
                if (filter(deal, addr, roleFilter, states)) {
                    ++result;
                }
                if (i == 0) {
                    break;
                }
            }
        }

        return result;
    }

    function min(uint a, uint b) private pure returns (uint) {
        return a <= b ? a : b;
    }

    function max(uint a, uint b) private pure returns (uint) {
        return a >= b ? a : b;
    }

    function createDeal(uint dealId, address taker, address arbiter, address token, uint amount, uint arbiterFeeInNormal, uint arbiterFeeInDispute, string memory terms) external onlyActive returns (uint) {
        require(deals[dealId].maker == address(0), "Duplicate dealId");
        require(arbiterFeeInNormal < amount, "Arbiter normal fee is too large");
        require(arbiterFeeInDispute < amount, "Arbiter dispute fee is too large");
        require(msg.sender != taker, "The maker and the taker have same address");
        require(msg.sender != arbiter, "The maker and the arbiter have same address");
        require(taker != arbiter, "The taker and the arbiter have same address");
        uint totalAmount = amount + max(arbiterFeeInNormal, arbiterFeeInDispute);
        deals[dealId] = DealInfo({
        id : dealId,
        createdAt : block.timestamp,
        terms : terms,
        maker : msg.sender,
        taker : taker,
        arbiter : arbiter,
        token : token,
        amount : amount,
        feeInfo : FeeInfo({
        arbiterFeeInNormal : arbiterFeeInNormal,
        arbiterFeeInDispute : arbiterFeeInDispute,
        arbiterSentToTaker : 0
        }),
        totalAmount : totalAmount,
        state : DealState.TakerWaiting
        });
        dealsByAddress[msg.sender].push(dealId);
        dealsByAddress[taker].push(dealId);
        dealsByAddress[arbiter].push(dealId);
        ++activeDeals;
        emit TakerWaiting(msg.sender, dealId);
        emit TakerWaiting(taker, dealId);
        emit TakerWaiting(arbiter, dealId);

        //transfer tokens from maker to contract
        ITRC20(token).transferFrom(msg.sender, address(this), totalAmount);
        return dealId;
    }

    function approveByTaker(uint dealId) external onlyOnState(dealId, DealState.TakerWaiting) {
        DealInfo memory deal = deals[dealId];
        require(deal.maker != address(0), "Can't find the deal");
        require(deal.taker == msg.sender, "You are not the taker");
        deals[dealId].state = DealState.ArbiterWaiting;
        emit ArbiterWaiting(deal.maker, dealId);
        emit ArbiterWaiting(deal.taker, dealId);
        emit ArbiterWaiting(deal.arbiter, dealId);
    }

    function approveByArbiter(uint dealId) external onlyOnState(dealId, DealState.ArbiterWaiting) {
        DealInfo memory deal = deals[dealId];
        require(deal.maker != address(0), "Can't find the deal");
        require(deal.arbiter == msg.sender, "You are not the arbiter");
        deals[dealId].state = DealState.InProgress;
        emit InProgress(deal.maker, dealId);
        emit InProgress(deal.taker, dealId);
        emit InProgress(deal.arbiter, dealId);
    }

    function cancel(uint dealId) external {
        DealInfo memory deal = deals[dealId];
        require(deal.maker != address(0), "Can't find the deal");
        DealRole role;
        require(deal.state != DealState.Canceled,
            "Deal is already canceled");
        if (msg.sender == deal.maker) {
            require(deal.state == DealState.TakerWaiting
                || deal.state == DealState.ArbiterWaiting,
                "Deal is already in progress");
            role = DealRole.Maker;
        } else if (msg.sender == deal.taker) {
            require(deal.state == DealState.TakerWaiting
                || deal.state == DealState.InProgress,
                "The taker can't cancel the deal in a status other than taker waiting and in progress");
            role = DealRole.Taker;
        } else if (msg.sender == deal.arbiter) {
            require(deal.state == DealState.ArbiterWaiting,
                "The arbiter can't cancel the deal in a status other than taker ready");
            role = DealRole.Arbiter;
        } else {
            revert("You are not a party to the deal");
        }

        deal.state = DealState.Canceled;
        emit Canceled(deal.maker, dealId, role, msg.sender);
        emit Canceled(deal.taker, dealId, role, msg.sender);
        emit Canceled(deal.arbiter, dealId, role, msg.sender);
        --activeDeals;
        //transfer back tokens from contract to maker
        ITRC20(deal.token).transfer(deal.maker, deal.totalAmount);
        deals[dealId] = deal;
    }

    function toReview(uint dealId) external onlyOnState(dealId, DealState.InProgress) {
        DealInfo memory deal = deals[dealId];
        require(deal.maker != address(0), "Can't find the deal");
        require(deal.taker == msg.sender, "You are not the taker");
        deals[dealId].state = DealState.InReview;
        emit InReview(deal.maker, dealId);
        emit InReview(deal.taker, dealId);
        emit InReview(deal.arbiter, dealId);
    }

    function releaseDeal(uint dealId) external onlyOnState(dealId, DealState.InReview) {
        DealInfo memory deal = deals[dealId];
        require(deal.maker != address(0), "Can't find the deal");
        require(deal.maker == msg.sender, "You are not the maker");
        deal.state = DealState.Done;
        emit Done(deal.maker, dealId);
        emit Done(deal.taker, dealId);
        emit Done(deal.arbiter, dealId);
        --activeDeals;
        FeeInfo memory feeInfo = deal.feeInfo;
        //transfer tokens to arbiter
        ITRC20(deal.token).transfer(deal.arbiter, feeInfo.arbiterFeeInNormal);
        if (feeInfo.arbiterFeeInNormal < feeInfo.arbiterFeeInDispute) {
            //Transfer the remaining fee to maker
            ITRC20(deal.token).transfer(deal.maker, feeInfo.arbiterFeeInDispute - feeInfo.arbiterFeeInNormal);
        }
        //transfer tokens to taker
        ITRC20(deal.token).transfer(deal.taker, deal.amount);
        deals[dealId] = deal;
    }

    function toDispute(uint dealId) external {
        DealInfo memory deal = deals[dealId];
        require(deal.maker != address(0), "Can't find the deal");
        require(deal.maker == msg.sender, "You are not the maker");
        require(deal.state == DealState.InProgress
            || deal.state == DealState.InReview,
            "Invalid deal state");
        deal.state = DealState.InDispute;
        emit InDispute(deal.maker, dealId);
        emit InDispute(deal.taker, dealId);
        emit InDispute(deal.arbiter, dealId);
        deals[dealId] = deal;
    }

    function resolveDispute(uint dealId, uint amountToTaker) external onlyOnState(dealId, DealState.InDispute) {
        DealInfo memory deal = deals[dealId];
        require(deal.maker != address(0), "Can't find the deal");
        require(deal.arbiter == msg.sender, "You are not the arbiter");
        require(amountToTaker <= deal.amount, "The amount is too large");
        deal.state = DealState.Resolved;
        emit Resolved(deal.maker, dealId, amountToTaker, deal.amount);
        emit Resolved(deal.taker, dealId, amountToTaker, deal.amount);
        emit Resolved(deal.arbiter, dealId, amountToTaker, deal.amount);
        deal.feeInfo.arbiterSentToTaker = amountToTaker;
        --activeDeals;

        FeeInfo memory feeInfo = deal.feeInfo;

        //Transfer tokens to arbiter
        ITRC20(deal.token).transfer(deal.arbiter, feeInfo.arbiterFeeInDispute);

        if (amountToTaker > 0) {
            //Transfer tokens to taker
            ITRC20(deal.token).transfer(deal.taker, amountToTaker);
        }
        if (amountToTaker < deal.amount) {
            //Transfer remainin tokens to maker
            ITRC20(deal.token).transfer(deal.maker, deal.amount - amountToTaker);
        }
        if (feeInfo.arbiterFeeInDispute < feeInfo.arbiterFeeInNormal) {
            //Transfer the remaining fee to maker
            ITRC20(deal.token).transfer(deal.maker, feeInfo.arbiterFeeInNormal - feeInfo.arbiterFeeInDispute);
        }
        deals[dealId] = deal;
    }

    function stop() external onlyOwner {
        isActive = false;
    }

    function start() external onlyOwner {
        isActive = true;
    }

    function destroy() external onlyOwner {
        require(activeDeals == 0, "There are active deals");
        selfdestruct(payable(owner));
    }
}
