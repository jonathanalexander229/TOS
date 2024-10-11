#
# Charles Schwab & Co. (c) 2007-2024
#

input length = 14;
input over_Bought = 70;
input over_Sold = 30;

input averageType = AverageType.WILDERS;
input showBreakoutSignals = no;

def dailyclose = close(period = AggregationPeriod.DAY);
def dailyhigh = high(period = AggregationPeriod.DAY);
def dailylow = low (period = AggregationPeriod.DAY);

def NetChgAvg = MovingAverage(averageType, dailyclose - dailyclose[1], length);
def TotChgAvg = MovingAverage(averageType, AbsValue(dailyclose - dailyclose[1]), length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def RSI = 50 * (ChgRatio + 1);
# plot OverSold = over_Sold;
# plot OverBought = over_Bought;


AddLabel(yes, "RSI " + Round(RSI,0), if RSI > .30 then Color.GREEN else if RSI < .70 then Color.RED else Color.GRAY);


def ATR = MovingAverage(averageType, TrueRange(dailyhigh, dailyclose, dailylow), length);
AddLabel(yes, "ATR " + Round(ATR,0), Color.WHITE);
