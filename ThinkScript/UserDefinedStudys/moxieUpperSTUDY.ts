declare upper;

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

def price =
  if currentAggPeriod == AggregationPeriod.FIFTEEN_MIN then high(period = higherAggPeriod)
  else close(period = higherAggPeriod)
;
def Moxie = MoxieFunc(price);

def longTrigger = if Moxie > 0 and Moxie[1] <= 0 then Moxie else Double.NaN;
def longArrowPosition =
  # first arrow
  if Moxie == longTrigger and Moxie != Moxie[1] then low
  # consecutive arrows at same position
  else if Moxie == longTrigger and Moxie == Moxie[1] then longArrowPosition[1]
  else Double.NaN;
plot long = longArrowPosition;
long.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
long.SetDefaultColor(Color.GREEN);
long.SetLineWeight(3);
long.HideBubble();
long.HideTitle();

def shortTrigger = if Moxie < 0 and Moxie[1] >= 0 then Moxie else Double.NaN;
def shortArrowPosition =
  # first arrow
  if Moxie == shortTrigger and Moxie != Moxie[1] then high
  # consecutive arrows at same position
  else if Moxie == shortTrigger and Moxie == Moxie[1] then shortArrowPosition[1]
  else Double.NaN;
plot short = shortArrowPosition;
short.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
short.SetDefaultColor(Color.LIGHT_RED);
short.SetLineWeight(3);
short.HideBubble();
short.HideTitle();
