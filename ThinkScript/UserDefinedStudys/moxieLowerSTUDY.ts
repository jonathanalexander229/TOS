declare lower;

input showVerticalLines = yes;
input showTrampolines = yes;

plot ZeroLine = 0;
ZeroLine.SetDefaultColor(Color.GRAY);
ZeroLine.HideBubble();
ZeroLine.HideTitle();

def currentAggPeriod = GetAggregationPeriod();
def higherAggPeriod =
  if currentAggPeriod <= AggregationPeriod.TWO_MIN then AggregationPeriod.FIVE_MIN
  else if currentAggPeriod <= AggregationPeriod.THREE_MIN then AggregationPeriod.TEN_MIN
  else if currentAggPeriod <= AggregationPeriod.FIVE_MIN then AggregationPeriod.FIFTEEN_MIN
  else if currentAggPeriod <= AggregationPeriod.TEN_MIN then AggregationPeriod.THIRTY_MIN
  else if currentAggPeriod <= AggregationPeriod.FIFTEEN_MIN then AggregationPeriod.HOUR
  else if currentAggPeriod <= AggregationPeriod.THIRTY_MIN then AggregationPeriod.TWO_HOURS
  else if currentAggPeriod <= AggregationPeriod.TWO_HOURS then AggregationPeriod.DAY
  else if currentAggPeriod <= AggregationPeriod.FOUR_HOURS then AggregationPeriod.TWO_DAYS
  else if currentAggPeriod <= AggregationPeriod.DAY then AggregationPeriod.WEEK
  else if currentAggPeriod <= AggregationPeriod.WEEK then AggregationPeriod.MONTH
  else AggregationPeriod.QUARTER
;

script MoxieFunc {
  input price = close;
  def vc1 = ExpAverage(price, 12) - ExpAverage(price , 26);
  def va1 = ExpAverage(vc1, 9);
  plot data = (vc1 - va1) * 3;
}

# Watkins uses the high for 15m charts and the close for other timeframes
def price =
  if currentAggPeriod == AggregationPeriod.FIFTEEN_MIN
  then high(period = higherAggPeriod)
  else close(period = higherAggPeriod)
;

plot Moxie = MoxieFunc(price);
Moxie.SetLineWeight(2);
Moxie.DefineColor("Up", Color.GREEN);
Moxie.DefineColor("Down", Color.RED);
def lastChange = if Moxie < Moxie[1] then 1 else 0;
Moxie.AssignValueColor(
  if lastChange == 1 then Moxie.Color("Down")
  else Moxie.Color("Up")
);

# Watkins uses a different setup for Moxie on his 15 minute charts.
# He uses two lines derived from two higher timeframes.
# We'll hide the second Moxie line by default. You should enable it
# on 15 minute charts.
# For timeframes other than 15 minutes we'll use the same data as
# first Moxie line to reduce data requested from the server and
# improve performance.
def secondAggPeriod =
  if currentAggPeriod == AggregationPeriod.FIFTEEN_MIN
  then AggregationPeriod.TWO_HOURS
  else currentAggPeriod
;

plot MoxieSecondLine =
  if currentAggPeriod == AggregationPeriod.FIFTEEN_MIN
  # on the next line it seems like we should be able to use AggregationPeriod.TWO_HOURS
  # instead of the secondAggPeriod variable holding that value but for some reason that
  # causes the main Moxie plot on 1 hour chart to render nothing.
  then MoxieFunc(high(period = secondAggPeriod))
  else Double.NaN
;

MoxieSecondLine.SetLineWeight(2);
MoxieSecondLine.DefineColor("Up", Color.GREEN);
MoxieSecondLine.DefineColor("Down", Color.RED);
def lastChangeSecondLine = if MoxieSecondLine < MoxieSecondLine[1] then 1 else 0;
MoxieSecondLine.AssignValueColor(
  if lastChangeSecondLine == 1 then MoxieSecondLine.Color("Down")
  else MoxieSecondLine.Color("Up")
);
MoxieSecondLine.Hide();

# Show vertical lines at crossovers
AddVerticalLine(showVerticalLines and Moxie[1] <= 0 and Moxie > 0, "", CreateColor(0,150,0), Curve.SHORT_DASH);
AddVerticalLine(showVerticalLines and Moxie[1] >= 0 and Moxie < 0, "", CreateColor(200,0,0), Curve.SHORT_DASH);

# Indicate the Trampoline setup
def sma50 = Average(close, 50);
plot Trampoline =
  if showTrampolines and ((Moxie < -.01 and close > sma50) or (Moxie > .01 and close < sma50))
  then 0
  else Double.NaN
;
Trampoline.SetPaintingStrategy(PaintingStrategy.SQUARES);
Trampoline.DefineColor("Bullish", Color.LIGHT_GREEN);
Trampoline.DefineColor("Bearish", Color.PINK);
Trampoline.AssignValueColor(if close > sma50 then Trampoline.Color("Bearish") else Trampoline.Color("Bullish"));
Trampoline.HideBubble();
Trampoline.HideTitle();

AddLabel(
  yes,
  if currentAggPeriod == AggregationPeriod.WEEK then " W "
  else if currentAggPeriod == AggregationPeriod.Day then " D "
  else if currentAggPeriod == AggregationPeriod.HOUR then " H "
  else if currentAggPeriod == AggregationPeriod.FIFTEEN_MIN then " 15 "
  else " ",
  if Moxie < 0 then Color.RED else Color.GREEN
);
