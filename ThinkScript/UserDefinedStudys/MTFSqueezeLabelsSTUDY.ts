#MTF SQUEEZE PRO LABELS
#BY: CASEY BRETT WITH THE USE OF CODE FROM: TOS Indicators

##Global Variables
input length = 20;
def AlertLine = 1;
input nk = 1.5;
input nkHi = 2;
input nkLo = 1;
def nBB = 2;
input averageType = AverageType.EXPONENTIAL;
def displace = 0;
input trueRangeAverageType = AverageType.SIMPLE;


input MonthLabel = yes;
input WeekLabel = yes;
input FourDayLabel = yes;
input ThreeDayLabel = yes;
input TwoDayLabel = yes;
input DayLabel = yes;
input FourHourLabel = yes;
input TwoHourLabel = yes;
input HourLabel = yes;
input ThirtyMinLabel = yes;
input TwentyMinLabel = yes;
input FifteenMinLabel = yes;
input TenMinLabel = yes;
input FiveMinLabel = yes;
input FourMinLabel = yes;
input ThreeMinLabel = yes;
input TwoMinLabel = yes;
input OneMinLabel = yes;


DefineGlobalColor("Squeeze", Color.RED);
DefineGlobalColor("PreSqueeze", Color.ORANGE);
DefineGlobalColor("ExtraSqueeze", Color.YELLOW);
DefineGlobalColor("NO Squeeze", Color.DARK_GREEN);

## Month Aggregation Period Variables

def monthPrice;
def monthATR;
def monthSDev;
def monthDenom;
def monthDenomLo;
def monthDenomHi;
def monthBBSInd;
def monthBBSIndLo;
def monthBBSIndHi;
def monthSqueeze;
def monthPreSqueeze;
def monthExtraSqueeze;
def monthAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.MONTH {
    monthPrice = close(period = "Month");
    monthATR = Average(TrueRange(high (period = "Month"), close(period = "Month"), low(period = "Month")), length);
    monthSDev = StDev(monthPrice, length);
    monthDenom = (nk * monthATR);
    monthDenomLo = (nkLo * monthATR);
    monthDenomHi = (nkHi * monthATR);
    monthBBSInd = If (monthDenom <> 0, ((nBB * monthSDev) / monthDenom), 0);
    monthBBSIndLo = If (monthDenomLo <> 0, ((nBB * monthSDev) / monthDenomLo), 0);
    monthBBSIndHi = If (monthDenomHi <> 0, ((nBB * monthSDev) / monthDenomHi), 0);
    monthSqueeze = if monthBBSInd < AlertLine then 1 else 0;
    monthPreSqueeze = if monthBBSIndHi < AlertLine then 1 else 0;
    monthExtraSqueeze = if monthBBSIndLo < AlertLine then 1 else 0;
    monthAggregationPeriod = 1;
}
else {
    monthPrice = 0;
    monthATR = 0;
    monthSDev = 0;
    monthDenom = 0;
    monthDenomLo = 0;
    monthDenomHi = 0;
    monthBBSInd = 0;
    monthBBSIndLo = 0;
    monthBBSIndHi = 0;
    monthSqueeze = 0;
    monthPreSqueeze = 0;
    monthExtraSqueeze = 0;
    monthAggregationPeriod = 0;
}
AddLabel(MonthLabel and monthAggregationPeriod, "M", if monthSqueeze then GlobalColor("Squeeze") else if monthExtraSqueeze then GlobalColor("ExtraSqueeze") else if monthPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));

def weekPrice;
def weekATR;
def weekSDev;
def weekDenom;
def weekDenomLo;
def weekDenomHi;
def weekBBSInd;
def weekBBSIndLo;
def weekBBSIndHi;
def weekSqueeze;
def weekPreSqueeze;
def weekExtraSqueeze;
def WeekAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.WEEK {
    weekPrice = close(period = "week");
    weekATR = Average(TrueRange(high (period = "week"), close(period = "week"), low(period = "week")), length);
    weekSDev = StDev(weekPrice, length);
    weekDenom = (nk * weekATR);
    weekDenomLo = (nkLo * weekATR);
    weekDenomHi = (nkHi * weekATR);
    weekBBSInd = If (weekDenom <> 0, ((nBB * weekSDev) / weekDenom), 0);
    weekBBSIndLo = If (weekDenomLo <> 0, ((nBB * weekSDev) / weekDenomLo), 0);
    weekBBSIndHi = If (weekDenomHi <> 0, ((nBB * weekSDev) / weekDenomHi), 0);
    weekSqueeze = if weekBBSInd < AlertLine then 1 else 0;
    weekPreSqueeze = if weekBBSIndHi < AlertLine then 1 else 0;
    weekExtraSqueeze = if weekBBSIndLo < AlertLine then 1 else 0;
    WeekAggregationPeriod = 1;
}
else {
    weekPrice = 0;
    weekATR = 0;
    weekSDev = 0;
    weekDenom = 0;
    weekDenomLo = 0;
    weekDenomHi = 0;
    weekBBSInd = 0;
    weekBBSIndLo = 0;
    weekBBSIndHi = 0;
    weekSqueeze = 0;
    weekPreSqueeze = 0;
    weekExtraSqueeze = 0;
    WeekAggregationPeriod = 0;
}
AddLabel(WeekLabel and WeekAggregationPeriod, "W", if weekSqueeze then GlobalColor("Squeeze") else if weekExtraSqueeze then GlobalColor("ExtraSqueeze") else if weekPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));
# AddLabel(weekExtraSqueeze and weekAggregationPeriod, "W", globalColor("week Squeeze"));
# AddLabel(!weekSqueeze and weekAggregationPeriod,"W", globalColor("NO week Squeeze"));


def four_daysPrice;
def four_daysATR;
def four_daysSDev;
def four_daysDenom;
def four_daysDenomLo;
def four_daysDenomHi;
def four_daysBBSInd;
def four_daysBBSIndLo;
def four_daysBBSIndHi;
def four_daysSqueeze;
def four_daysPreSqueeze;
def four_daysExtraSqueeze;
def Four_DayMinAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.FOUR_DAYS {
    four_daysPrice = close(period = "4 Days");
    four_daysATR = Average(TrueRange(high (period = "4 Days"), close(period = "4 Days"), low(period = "4 Days")), length);
    four_daysSDev = StDev(four_daysPrice, length);
    four_daysDenom = (nk * four_daysATR);
    four_daysDenomLo = (nkLo * four_daysATR);
    four_daysDenomHi = (nkHi * four_daysATR);
    four_daysBBSInd = If (four_daysDenom <> 0, ((nBB * four_daysSDev) / four_daysDenom), 0);
    four_daysBBSIndLo = If (four_daysDenomLo <> 0, ((nBB * four_daysSDev) / four_daysDenomLo), 0);
    four_daysBBSIndHi = If (four_daysDenomHi <> 0, ((nBB * four_daysSDev) / four_daysDenomHi), 0);
    four_daysSqueeze = if four_daysBBSInd < AlertLine then 1 else 0;
    four_daysPreSqueeze = if four_daysBBSIndHi < AlertLine then 1 else 0;
    four_daysExtraSqueeze = if four_daysBBSIndLo < AlertLine then 1 else 0;
    Four_DayMinAggregationPeriod = 1;
}
else {
    four_daysPrice = 0;
    four_daysATR = 0;
    four_daysSDev = 0;
    four_daysDenom = 0;
    four_daysDenomLo = 0;
    four_daysDenomHi = 0;
    four_daysBBSInd = 0;
    four_daysBBSIndLo = 0;
    four_daysBBSIndHi = 0;
    four_daysSqueeze = 0;
    four_daysPreSqueeze = 0;
    four_daysExtraSqueeze = 0;
    Four_DayMinAggregationPeriod = 0;
}
AddLabel(FourDayLabel and Four_DayMinAggregationPeriod, "4D", if four_daysSqueeze then GlobalColor("Squeeze") else if four_daysExtraSqueeze then GlobalColor("ExtraSqueeze") else if four_daysPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));
# AddLabel(four_daysExtraSqueeze and four_daysAggregationPeriod, "W", globalColor("four_days Squeeze"));
# AddLabel(!four_daysSqueeze and four_daysAggregationPeriod,"W", globalColor("NO four_days Squeeze"));


def three_daysPrice;
def three_daysATR;
def three_daysSDev;
def three_daysDenom;
def three_daysDenomLo;
def three_daysDenomHi;
def three_daysBBSInd;
def three_daysBBSIndLo;
def three_daysBBSIndHi;
def three_daysSqueeze;
def three_daysPreSqueeze;
def three_daysExtraSqueeze;
def three_dayMinAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.THREE_DAYS {
    three_daysPrice = close(period = "3 Days");
    three_daysATR = Average(TrueRange(high (period = "3 Days"), close(period = "3 Days"), low(period = "3 Days")), length);
    three_daysSDev = StDev(three_daysPrice, length);
    three_daysDenom = (nk * three_daysATR);
    three_daysDenomLo = (nkLo * three_daysATR);
    three_daysDenomHi = (nkHi * three_daysATR);
    three_daysBBSInd = If (three_daysDenom <> 0, ((nBB * three_daysSDev) / three_daysDenom), 0);
    three_daysBBSIndLo = If (three_daysDenomLo <> 0, ((nBB * three_daysSDev) / three_daysDenomLo), 0);
    three_daysBBSIndHi = If (three_daysDenomHi <> 0, ((nBB * three_daysSDev) / three_daysDenomHi), 0);
    three_daysSqueeze = if three_daysBBSInd < AlertLine then 1 else 0;
    three_daysPreSqueeze = if three_daysBBSIndHi < AlertLine then 1 else 0;
    three_daysExtraSqueeze = if three_daysBBSIndLo < AlertLine then 1 else 0;
    three_dayMinAggregationPeriod = 1;
}
else {
    three_daysPrice = 0;
    three_daysATR = 0;
    three_daysSDev = 0;
    three_daysDenom = 0;
    three_daysDenomLo = 0;
    three_daysDenomHi = 0;
    three_daysBBSInd = 0;
    three_daysBBSIndLo = 0;
    three_daysBBSIndHi = 0;
    three_daysSqueeze = 0;
    three_daysPreSqueeze = 0;
    three_daysExtraSqueeze = 0;
    three_dayMinAggregationPeriod = 0;
}
AddLabel(ThreeDayLabel and three_dayMinAggregationPeriod, "3D", if three_daysSqueeze then GlobalColor("Squeeze") else if three_daysExtraSqueeze then GlobalColor("ExtraSqueeze") else if three_daysPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));


def two_daysPrice;
def two_daysATR;
def two_daysSDev;
def two_daysDenom;
def two_daysDenomLo;
def two_daysDenomHi;
def two_daysBBSInd;
def two_daysBBSIndLo;
def two_daysBBSIndHi;
def two_daysSqueeze;
def two_daysPreSqueeze;
def two_daysExtraSqueeze;
def two_dayMinAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.TWO_DAYS {
    two_daysPrice = close(period = "2 Days");
    two_daysATR = Average(TrueRange(high (period = "2 Days"), close(period = "2 Days"), low(period = "2 Days")), length);
    two_daysSDev = StDev(two_daysPrice, length);
    two_daysDenom = (nk * two_daysATR);
    two_daysDenomLo = (nkLo * two_daysATR);
    two_daysDenomHi = (nkHi * two_daysATR);
    two_daysBBSInd = If (two_daysDenom <> 0, ((nBB * two_daysSDev) / two_daysDenom), 0);
    two_daysBBSIndLo = If (two_daysDenomLo <> 0, ((nBB * two_daysSDev) / two_daysDenomLo), 0);
    two_daysBBSIndHi = If (two_daysDenomHi <> 0, ((nBB * two_daysSDev) / two_daysDenomHi), 0);
    two_daysSqueeze = if two_daysBBSInd < AlertLine then 1 else 0;
    two_daysPreSqueeze = if two_daysBBSIndHi < AlertLine then 1 else 0;
    two_daysExtraSqueeze = if two_daysBBSIndLo < AlertLine then 1 else 0;
    two_dayMinAggregationPeriod = 1;
}
else {
    two_daysPrice = 0;
    two_daysATR = 0;
    two_daysSDev = 0;
    two_daysDenom = 0;
    two_daysDenomLo = 0;
    two_daysDenomHi = 0;
    two_daysBBSInd = 0;
    two_daysBBSIndLo = 0;
    two_daysBBSIndHi = 0;
    two_daysSqueeze = 0;
    two_daysPreSqueeze = 0;
    two_daysExtraSqueeze = 0;
    two_dayMinAggregationPeriod = 0;
}
AddLabel(TwoDayLabel and two_dayMinAggregationPeriod, "2D", if two_daysSqueeze then GlobalColor("Squeeze") else if two_daysExtraSqueeze then GlobalColor("ExtraSqueeze") else if two_daysPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));

def dayPrice;
def dayATR;
def daySDev;
def dayDenom;
def dayDenomLo;
def dayDenomHi;
def dayBBSInd;
def dayBBSIndLo;
def dayBBSIndHi;
def daySqueeze;
def dayPreSqueeze;
def dayExtraSqueeze;
def dayMinAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.DAY {
    dayPrice = close(period = "Day");
    dayATR = Average(TrueRange(high (period = "Day"), close(period = "Day"), low(period = "Day")), length);
    daySDev = StDev(dayPrice, length);
    dayDenom = (nk * dayATR);
    dayDenomLo = (nkLo * dayATR);
    dayDenomHi = (nkHi * dayATR);
    dayBBSInd = If (dayDenom <> 0, ((nBB * daySDev) / dayDenom), 0);
    dayBBSIndLo = If (dayDenomLo <> 0, ((nBB * daySDev) / dayDenomLo), 0);
    dayBBSIndHi = If (dayDenomHi <> 0, ((nBB * daySDev) / dayDenomHi), 0);
    daySqueeze = if dayBBSInd < AlertLine then 1 else 0;
    dayPreSqueeze = if dayBBSIndHi < AlertLine then 1 else 0;
    dayExtraSqueeze = if dayBBSIndLo < AlertLine then 1 else 0;
    dayMinAggregationPeriod = 1;
}
else {
    dayPrice = 0;
    dayATR = 0;
    daySDev = 0;
    dayDenom = 0;
    dayDenomLo = 0;
    dayDenomHi = 0;
    dayBBSInd = 0;
    dayBBSIndLo = 0;
    dayBBSIndHi = 0;
    daySqueeze = 0;
    dayPreSqueeze = 0;
    dayExtraSqueeze = 0;
    dayMinAggregationPeriod = 0;
}
AddLabel(DayLabel and dayMinAggregationPeriod, "D", if daySqueeze then GlobalColor("Squeeze") else if dayExtraSqueeze then GlobalColor("ExtraSqueeze") else if dayPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));

def four_hoursPrice;
def four_hoursATR;
def four_hoursSDev;
def four_hoursDenom;
def four_hoursDenomLo;
def four_hoursDenomHi;
def four_hoursBBSInd;
def four_hoursBBSIndLo;
def four_hoursBBSIndHi;
def four_hoursSqueeze;
def four_hoursPreSqueeze;
def four_hoursExtraSqueeze;
def FourHourMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.FOUR_HOURS {
    four_hoursPrice = close(period = "4 Hours");
    four_hoursATR = Average(TrueRange(high (period = "4 Hours"), close(period = "4 Hours"), low(period = "4 Hours")), length);
    four_hoursSDev = StDev(four_hoursPrice, length);
    four_hoursDenom = (nk * four_hoursATR);
    four_hoursDenomLo = (nkLo * four_hoursATR);
    four_hoursDenomHi = (nkHi * four_hoursATR);
    four_hoursBBSInd = If (four_hoursDenom <> 0, ((nBB * four_hoursSDev) / four_hoursDenom), 0);
    four_hoursBBSIndLo = If (four_hoursDenomLo <> 0, ((nBB * four_hoursSDev) / four_hoursDenomLo), 0);
    four_hoursBBSIndHi = If (four_hoursDenomHi <> 0, ((nBB * four_hoursSDev) / four_hoursDenomHi), 0);
    four_hoursSqueeze = if four_hoursBBSInd < AlertLine then 1 else 0;
    four_hoursPreSqueeze = if four_hoursBBSIndHi < AlertLine then 1 else 0;
    four_hoursExtraSqueeze = if four_hoursBBSIndLo < AlertLine then 1 else 0;
    FourHourMinAggregationPeriod = 1;
}
else {
    four_hoursPrice = 0;
    four_hoursATR = 0;
    four_hoursSDev = 0;
    four_hoursDenom = 0;
    four_hoursDenomLo = 0;
    four_hoursDenomHi = 0;
    four_hoursBBSInd = 0;
    four_hoursBBSIndLo = 0;
    four_hoursBBSIndHi = 0;
    four_hoursSqueeze = 0;
    four_hoursPreSqueeze = 0;
    four_hoursExtraSqueeze = 0;
    FourHourMinAggregationPeriod = 0;
}
AddLabel(FourHourLabel and FourHourMinAggregationPeriod, "4h", if four_hoursSqueeze then GlobalColor("Squeeze") else if four_hoursPreSqueeze then GlobalColor("PreSqueeze") else if four_hoursExtraSqueeze then GlobalColor("ExtraSqueeze") else GlobalColor("No Squeeze"));

def two_hoursPrice;
def two_hoursATR;
def two_hoursSDev;
def two_hoursDenom;
def two_hoursDenomLo;
def two_hoursDenomHi;
def two_hoursBBSInd;
def two_hoursBBSIndLo;
def two_hoursBBSIndHi;
def two_hoursSqueeze;
def two_hoursPreSqueeze;
def two_hoursExtraSqueeze;
def two_hoursMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.TWO_HOURS {
    two_hoursPrice = close(period = "2 Hours");
    two_hoursATR = Average(TrueRange(high (period = "2 Hours"), close(period = "2 Hours"), low(period = "2 Hours")), length);
    two_hoursSDev = StDev(two_hoursPrice, length);
    two_hoursDenom = (nk * two_hoursATR);
    two_hoursDenomLo = (nkLo * two_hoursATR);
    two_hoursDenomHi = (nkHi * two_hoursATR);
    two_hoursBBSInd = If (two_hoursDenom <> 0, ((nBB * two_hoursSDev) / two_hoursDenom), 0);
    two_hoursBBSIndLo = If (two_hoursDenomLo <> 0, ((nBB * two_hoursSDev) / two_hoursDenomLo), 0);
    two_hoursBBSIndHi = If (two_hoursDenomHi <> 0, ((nBB * two_hoursSDev) / two_hoursDenomHi), 0);
    two_hoursSqueeze = if two_hoursBBSInd < AlertLine then 1 else 0;
    two_hoursPreSqueeze = if two_hoursBBSIndHi < AlertLine then 1 else 0;
    two_hoursExtraSqueeze = if two_hoursBBSIndLo < AlertLine then 1 else 0;
    two_hoursMinAggregationPeriod = 1;
}
else {
    two_hoursPrice = 0;
    two_hoursATR = 0;
    two_hoursSDev = 0;
    two_hoursDenom = 0;
    two_hoursDenomLo = 0;
    two_hoursDenomHi = 0;
    two_hoursBBSInd = 0;
    two_hoursBBSIndLo = 0;
    two_hoursBBSIndHi = 0;
    two_hoursSqueeze = 0;
    two_hoursPreSqueeze = 0;
    two_hoursExtraSqueeze = 0;
    two_hoursMinAggregationPeriod = 0;
}
AddLabel(TwoHourLabel and two_hoursMinAggregationPeriod, "2h", if two_hoursPreSqueeze then GlobalColor("PreSqueeze") else if two_hoursSqueeze then GlobalColor("Squeeze" ) else if two_hoursExtraSqueeze then GlobalColor("ExtraSqueeze") else GlobalColor("NO Squeeze"));

def hourPrice;
def hourATR;
def hourSDev;
def hourDenom;
def hourDenomLo;
def hourDenomHi;
def hourBBSInd;
def hourBBSIndLo;
def hourBBSIndHi;
def hourSqueeze;
def hourPreSqueeze;
def hourExtraSqueeze;
def HourMinAggregationPeriod;
if GetAggregationPeriod() <= AggregationPeriod.HOUR {
    hourPrice = close(period = "1 Hour");
    hourATR = Average(TrueRange(high (period = "1 Hour"), close(period = "1 Hour"), low(period = "1 Hour")), length);
    hourSDev = StDev(hourPrice, length);
    hourDenom = (nk * hourATR);
    hourDenomLo = (nkLo * hourATR);
    hourDenomHi = (nkHi * hourATR);
    hourBBSInd = If (hourDenom <> 0, ((nBB * hourSDev) / hourDenom), 0);
    hourBBSIndLo = If (hourDenomLo <> 0, ((nBB * hourSDev) / hourDenomLo), 0);
    hourBBSIndHi = If (hourDenomHi <> 0, ((nBB * hourSDev) / hourDenomHi), 0);
    hourSqueeze = if hourBBSInd < AlertLine then 1 else 0;
    hourPreSqueeze = if hourBBSIndHi < AlertLine then 1 else 0;
    hourExtraSqueeze = if hourBBSIndLo < AlertLine then 1 else 0;
    HourMinAggregationPeriod = 1;
}
else {
    hourPrice = 0;
    hourATR = 0;
    hourSDev = 0;
    hourDenom = 0;
    hourDenomLo = 0;
    hourDenomHi = 0;
    hourBBSInd = 0;
    hourBBSIndLo = 0;
    hourBBSIndHi = 0;
    hourSqueeze = 0;
    hourPreSqueeze = 0;
    hourExtraSqueeze = 0;
    HourMinAggregationPeriod = 0;
}
AddLabel(HourLabel and HourMinAggregationPeriod, "1h", if hourPreSqueeze then GlobalColor("PreSqueeze") else if hourSqueeze then GlobalColor("Squeeze" ) else if hourExtraSqueeze then GlobalColor("ExtraSqueeze") else GlobalColor("NO Squeeze"));

def Thirty_MinPrice;
def Thirty_MinATR;
def Thirty_MinSDev;
def Thirty_MinDenom;
def Thirty_MinDenomLo;
def Thirty_MinDenomHi;
def Thirty_MinBBSInd;
def Thirty_MinBBSIndLo;
def Thirty_MinBBSIndHi;
def Thirty_MinSqueeze;
def Thirty_MinPreSqueeze;
def Thirty_MinExtraSqueeze;
def Thirty_MinAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.THIRTY_MIN {
    Thirty_MinPrice = close(period = "30 Min");
    Thirty_MinATR = Average(TrueRange(high (period = "30 Min"), close(period = "30 Min"), low(period = "30 Min")), length);
    Thirty_MinSDev = StDev(Thirty_MinPrice, length);
    Thirty_MinDenom = (nk * Thirty_MinATR);
    Thirty_MinDenomLo = (nkLo * Thirty_MinATR);
    Thirty_MinDenomHi = (nkHi * Thirty_MinATR);
    Thirty_MinBBSInd = If (Thirty_MinDenom <> 0, ((nBB * Thirty_MinSDev) / Thirty_MinDenom), 0);
    Thirty_MinBBSIndLo = If (Thirty_MinDenomLo <> 0, ((nBB * Thirty_MinSDev) / Thirty_MinDenomLo), 0);
    Thirty_MinBBSIndHi = If (Thirty_MinDenomHi <> 0, ((nBB * Thirty_MinSDev) / Thirty_MinDenomHi), 0);
    Thirty_MinSqueeze = if Thirty_MinBBSInd < AlertLine then 1 else 0;
    Thirty_MinPreSqueeze = if Thirty_MinBBSIndHi < AlertLine then 1 else 0;
    Thirty_MinExtraSqueeze = if Thirty_MinBBSIndLo < AlertLine then 1 else 0;
    Thirty_MinAggregationPeriod = 1;
}
else {
    Thirty_MinPrice = 0;
    Thirty_MinATR = 0;
    Thirty_MinSDev = 0;
    Thirty_MinDenom = 0;
    Thirty_MinDenomLo = 0;
    Thirty_MinDenomHi = 0;
    Thirty_MinBBSInd = 0;
    Thirty_MinBBSIndLo = 0;
    Thirty_MinBBSIndHi = 0;
    Thirty_MinSqueeze = 0;
    Thirty_MinPreSqueeze = 0;
    Thirty_MinExtraSqueeze = 0;
    Thirty_MinAggregationPeriod = 0;
}
AddLabel(ThirtyMinLabel and Thirty_MinAggregationPeriod, "30m", if Thirty_MinSqueeze then GlobalColor("Squeeze") else if Thirty_MinExtraSqueeze then GlobalColor("ExtraSqueeze") else if Thirty_MinPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));

def Twenty_MinPrice;
def Twenty_MinATR;
def Twenty_MinSDev;
def Twenty_MinDenom;
def Twenty_MinDenomLo;
def Twenty_MinDenomHi;
def Twenty_MinBBSInd;
def Twenty_MinBBSIndLo;
def Twenty_MinBBSIndHi;
def Twenty_MinSqueeze;
def Twenty_MinPreSqueeze;
def Twenty_MinExtraSqueeze;
def Twenty_MinAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.TWENTY_MIN {
    Twenty_MinPrice = close(period = "20 Min");
    Twenty_MinATR = Average(TrueRange(high (period = "20 Min"), close(period = "20 Min"), low(period = "20 Min")), length);
    Twenty_MinSDev = StDev(Twenty_MinPrice, length);
    Twenty_MinDenom = (nk * Twenty_MinATR);
    Twenty_MinDenomLo = (nkLo * Twenty_MinATR);
    Twenty_MinDenomHi = (nkHi * Twenty_MinATR);
    Twenty_MinBBSInd = If (Twenty_MinDenom <> 0, ((nBB * Twenty_MinSDev) / Twenty_MinDenom), 0);
    Twenty_MinBBSIndLo = If (Twenty_MinDenomLo <> 0, ((nBB * Twenty_MinSDev) / Twenty_MinDenomLo), 0);
    Twenty_MinBBSIndHi = If (Twenty_MinDenomHi <> 0, ((nBB * Twenty_MinSDev) / Twenty_MinDenomHi), 0);
    Twenty_MinSqueeze = if Twenty_MinBBSInd < AlertLine then 1 else 0;
    Twenty_MinPreSqueeze = if Twenty_MinBBSIndHi < AlertLine then 1 else 0;
    Twenty_MinExtraSqueeze = if Twenty_MinBBSIndLo < AlertLine then 1 else 0;
    Twenty_MinAggregationPeriod = 1;
}
else {
    Twenty_MinPrice = 0;
    Twenty_MinATR = 0;
    Twenty_MinSDev = 0;
    Twenty_MinDenom = 0;
    Twenty_MinDenomLo = 0;
    Twenty_MinDenomHi = 0;
    Twenty_MinBBSInd = 0;
    Twenty_MinBBSIndLo = 0;
    Twenty_MinBBSIndHi = 0;
    Twenty_MinSqueeze = 0;
    Twenty_MinPreSqueeze = 0;
    Twenty_MinExtraSqueeze = 0;
    Twenty_MinAggregationPeriod = 0;
}
AddLabel(TwentyMinLabel and Twenty_MinAggregationPeriod, "20m", if Twenty_MinSqueeze then GlobalColor("Squeeze") else if Twenty_MinExtraSqueeze then GlobalColor("ExtraSqueeze") else if Twenty_MinPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));


def Fifteen_MinPrice;
def Fifteen_MinATR;
def Fifteen_MinSDev;
def Fifteen_MinDenom;
def Fifteen_MinDenomLo;
def Fifteen_MinDenomHi;
def Fifteen_MinBBSInd;
def Fifteen_MinBBSIndLo;
def Fifteen_MinBBSIndHi;
def Fifteen_MinSqueeze;
def Fifteen_MinPreSqueeze;
def Fifteen_MinExtraSqueeze;
def Fifteen_MinAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.FIFTEEN_MIN {
    Fifteen_MinPrice = close(period = "15 Min");
    Fifteen_MinATR = Average(TrueRange(high (period = "15 Min"), close(period = "15 Min"), low(period = "15 Min")), length);
    Fifteen_MinSDev = StDev(Fifteen_MinPrice, length);
    Fifteen_MinDenom = (nk * Fifteen_MinATR);
    Fifteen_MinDenomLo = (nkLo * Fifteen_MinATR);
    Fifteen_MinDenomHi = (nkHi * Fifteen_MinATR);
    Fifteen_MinBBSInd = If (Fifteen_MinDenom <> 0, ((nBB * Fifteen_MinSDev) / Fifteen_MinDenom), 0);
    Fifteen_MinBBSIndLo = If (Fifteen_MinDenomLo <> 0, ((nBB * Fifteen_MinSDev) / Fifteen_MinDenomLo), 0);
    Fifteen_MinBBSIndHi = If (Fifteen_MinDenomHi <> 0, ((nBB * Fifteen_MinSDev) / Fifteen_MinDenomHi), 0);
    Fifteen_MinSqueeze = if Fifteen_MinBBSInd < AlertLine then 1 else 0;
    Fifteen_MinPreSqueeze = if Fifteen_MinBBSIndHi < AlertLine then 1 else 0;
    Fifteen_MinExtraSqueeze = if Fifteen_MinBBSIndLo < AlertLine then 1 else 0;
    Fifteen_MinAggregationPeriod = 1;
}
else {
    Fifteen_MinPrice = 0;
    Fifteen_MinATR = 0;
    Fifteen_MinSDev = 0;
    Fifteen_MinDenom = 0;
    Fifteen_MinDenomLo = 0;
    Fifteen_MinDenomHi = 0;
    Fifteen_MinBBSInd = 0;
    Fifteen_MinBBSIndLo = 0;
    Fifteen_MinBBSIndHi = 0;
    Fifteen_MinSqueeze = 0;
    Fifteen_MinPreSqueeze = 0;
    Fifteen_MinExtraSqueeze = 0;
    Fifteen_MinAggregationPeriod = 0;
}
AddLabel(FifteenMinLabel and Fifteen_MinAggregationPeriod, "15m", if Fifteen_MinSqueeze then GlobalColor("Squeeze") else if Fifteen_MinExtraSqueeze then GlobalColor("ExtraSqueeze") else if Fifteen_MinPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));

def ten_minPrice;
def ten_minATR;
def ten_minSDev;
def ten_minDenom;
def ten_minDenomLo;
def ten_minDenomHi;
def ten_minBBSInd;
def ten_minBBSIndLo;
def ten_minBBSIndHi;
def ten_minSqueeze;
def ten_minPreSqueeze;
def ten_minExtraSqueeze;
def ten_minAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.TEN_MIN {
    ten_minPrice = close(period = "10 Min");
    ten_minATR = Average(TrueRange(high (period = "10 Min"), close(period = "10 Min"), low(period = "10 Min")), length);
    ten_minSDev = StDev(ten_minPrice, length);
    ten_minDenom = (nk * ten_minATR);
    ten_minDenomLo = (nkLo * ten_minATR);
    ten_minDenomHi = (nkHi * ten_minATR);
    ten_minBBSInd = If (ten_minDenom <> 0, ((nBB * ten_minSDev) / ten_minDenom), 0);
    ten_minBBSIndLo = If (ten_minDenomLo <> 0, ((nBB * ten_minSDev) / ten_minDenomLo), 0);
    ten_minBBSIndHi = If (ten_minDenomHi <> 0, ((nBB * ten_minSDev) / ten_minDenomHi), 0);
    ten_minSqueeze = if ten_minBBSInd < AlertLine then 1 else 0;
    ten_minPreSqueeze = if ten_minBBSIndHi < AlertLine then 1 else 0;
    ten_minExtraSqueeze = if ten_minBBSIndLo < AlertLine then 1 else 0;
    ten_minAggregationPeriod = 1;
}
else {
    ten_minPrice = 0;
    ten_minATR = 0;
    ten_minSDev = 0;
    ten_minDenom = 0;
    ten_minDenomLo = 0;
    ten_minDenomHi = 0;
    ten_minBBSInd = 0;
    ten_minBBSIndLo = 0;
    ten_minBBSIndHi = 0;
    ten_minSqueeze = 0;
    ten_minPreSqueeze = 0;
    ten_minExtraSqueeze = 0;
    ten_minAggregationPeriod = 0;
}
AddLabel(TenMinLabel and ten_minAggregationPeriod, "10m", if ten_minSqueeze then GlobalColor("Squeeze") else if ten_minExtraSqueeze then GlobalColor("ExtraSqueeze") else if ten_minPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));


def five_minPrice;
def five_minATR;
def five_minSDev;
def five_minDenom;
def five_minDenomLo;
def five_minDenomHi;
def five_minBBSInd;
def five_minBBSIndLo;
def five_minBBSIndHi;
def five_minSqueeze;
def five_minPreSqueeze;
def five_minExtraSqueeze;
def five_minAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.FIVE_MIN {
    five_minPrice = close(period = "5 Min");
    five_minATR = Average(TrueRange(high (period = "5 Min"), close(period = "5 Min"), low(period = "5 Min")), length);
    five_minSDev = StDev(five_minPrice, length);
    five_minDenom = (nk * five_minATR);
    five_minDenomLo = (nkLo * five_minATR);
    five_minDenomHi = (nkHi * five_minATR);
    five_minBBSInd = If (five_minDenom <> 0, ((nBB * five_minSDev) / five_minDenom), 0);
    five_minBBSIndLo = If (five_minDenomLo <> 0, ((nBB * five_minSDev) / five_minDenomLo), 0);
    five_minBBSIndHi = If (five_minDenomHi <> 0, ((nBB * five_minSDev) / five_minDenomHi), 0);
    five_minSqueeze = if five_minBBSInd < AlertLine then 1 else 0;
    five_minPreSqueeze = if five_minBBSIndHi < AlertLine then 1 else 0;
    five_minExtraSqueeze = if five_minBBSIndLo < AlertLine then 1 else 0;
    five_minAggregationPeriod = 1;
}
else {
    five_minPrice = 0;
    five_minATR = 0;
    five_minSDev = 0;
    five_minDenom = 0;
    five_minDenomLo = 0;
    five_minDenomHi = 0;
    five_minBBSInd = 0;
    five_minBBSIndLo = 0;
    five_minBBSIndHi = 0;
    five_minSqueeze = 0;
    five_minPreSqueeze = 0;
    five_minExtraSqueeze = 0;
    five_minAggregationPeriod = 0;
}
AddLabel(FiveMinLabel and five_minAggregationPeriod, "5m", if five_minSqueeze then GlobalColor("Squeeze") else if five_minExtraSqueeze then GlobalColor("ExtraSqueeze") else if five_minPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));


def four_minPrice;
def four_minATR;
def four_minSDev;
def four_minDenom;
def four_minDenomLo;
def four_minDenomHi;
def four_minBBSInd;
def four_minBBSIndLo;
def four_minBBSIndHi;
def four_minSqueeze;
def four_minPreSqueeze;
def four_minExtraSqueeze;
def four_minAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.FOUR_MIN {
    four_minPrice = close(period = "4 Min");
    four_minATR = Average(TrueRange(high (period = "4 Min"), close(period = "4 Min"), low(period = "4 Min")), length);
    four_minSDev = StDev(four_minPrice, length);
    four_minDenom = (nk * four_minATR);
    four_minDenomLo = (nkLo * four_minATR);
    four_minDenomHi = (nkHi * four_minATR);
    four_minBBSInd = If (four_minDenom <> 0, ((nBB * four_minSDev) / four_minDenom), 0);
    four_minBBSIndLo = If (four_minDenomLo <> 0, ((nBB * four_minSDev) / four_minDenomLo), 0);
    four_minBBSIndHi = If (four_minDenomHi <> 0, ((nBB * four_minSDev) / four_minDenomHi), 0);
    four_minSqueeze = if four_minBBSInd < AlertLine then 1 else 0;
    four_minPreSqueeze = if four_minBBSIndHi < AlertLine then 1 else 0;
    four_minExtraSqueeze = if four_minBBSIndLo < AlertLine then 1 else 0;
    four_minAggregationPeriod = 1;
}
else {
    four_minPrice = 0;
    four_minATR = 0;
    four_minSDev = 0;
    four_minDenom = 0;
    four_minDenomLo = 0;
    four_minDenomHi = 0;
    four_minBBSInd = 0;
    four_minBBSIndLo = 0;
    four_minBBSIndHi = 0;
    four_minSqueeze = 0;
    four_minPreSqueeze = 0;
    four_minExtraSqueeze = 0;
    four_minAggregationPeriod = 0;
}
AddLabel(FourMinLabel and four_minAggregationPeriod, "4m", if four_minSqueeze then GlobalColor("Squeeze") else if four_minExtraSqueeze then GlobalColor("ExtraSqueeze") else if four_minPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));


def three_minPrice;
def three_minATR;
def three_minSDev;
def three_minDenom;
def three_minDenomLo;
def three_minDenomHi;
def three_minBBSInd;
def three_minBBSIndLo;
def three_minBBSIndHi;
def three_minSqueeze;
def three_minPreSqueeze;
def three_minExtraSqueeze;
def three_minAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.THREE_MIN {
    three_minPrice = close(period = "3 Min");
    three_minATR = Average(TrueRange(high (period = "3 Min"), close(period = "3 Min"), low(period = "3 Min")), length);
    three_minSDev = StDev(three_minPrice, length);
    three_minDenom = (nk * three_minATR);
    three_minDenomLo = (nkLo * three_minATR);
    three_minDenomHi = (nkHi * three_minATR);
    three_minBBSInd = If (three_minDenom <> 0, ((nBB * three_minSDev) / three_minDenom), 0);
    three_minBBSIndLo = If (three_minDenomLo <> 0, ((nBB * three_minSDev) / three_minDenomLo), 0);
    three_minBBSIndHi = If (three_minDenomHi <> 0, ((nBB * three_minSDev) / three_minDenomHi), 0);
    three_minSqueeze = if three_minBBSInd < AlertLine then 1 else 0;
    three_minPreSqueeze = if three_minBBSIndHi < AlertLine then 1 else 0;
    three_minExtraSqueeze = if three_minBBSIndLo < AlertLine then 1 else 0;
    three_minAggregationPeriod = 1;
}
else {
    three_minPrice = 0;
    three_minATR = 0;
    three_minSDev = 0;
    three_minDenom = 0;
    three_minDenomLo = 0;
    three_minDenomHi = 0;
    three_minBBSInd = 0;
    three_minBBSIndLo = 0;
    three_minBBSIndHi = 0;
    three_minSqueeze = 0;
    three_minPreSqueeze = 0;
    three_minExtraSqueeze = 0;
    three_minAggregationPeriod = 0;
}
AddLabel(ThreeMinLabel and three_minAggregationPeriod, "3m", if three_minSqueeze then GlobalColor("Squeeze") else if three_minExtraSqueeze then GlobalColor("ExtraSqueeze") else if three_minPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));


def two_minPrice;
def two_minATR;
def two_minSDev;
def two_minDenom;
def two_minDenomLo;
def two_minDenomHi;
def two_minBBSInd;
def two_minBBSIndLo;
def two_minBBSIndHi;
def two_minSqueeze;
def two_minPreSqueeze;
def two_minExtraSqueeze;
def two_minAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.TWO_MIN {
    two_minPrice = close(period = "2 Min");
    two_minATR = Average(TrueRange(high (period = "2 Min"), close(period = "2 Min"), low(period = "2 Min")), length);
    two_minSDev = StDev(two_minPrice, length);
    two_minDenom = (nk * two_minATR);
    two_minDenomLo = (nkLo * two_minATR);
    two_minDenomHi = (nkHi * two_minATR);
    two_minBBSInd = If (two_minDenom <> 0, ((nBB * two_minSDev) / two_minDenom), 0);
    two_minBBSIndLo = If (two_minDenomLo <> 0, ((nBB * two_minSDev) / two_minDenomLo), 0);
    two_minBBSIndHi = If (two_minDenomHi <> 0, ((nBB * two_minSDev) / two_minDenomHi), 0);
    two_minSqueeze = if two_minBBSInd < AlertLine then 1 else 0;
    two_minPreSqueeze = if two_minBBSIndHi < AlertLine then 1 else 0;
    two_minExtraSqueeze = if two_minBBSIndLo < AlertLine then 1 else 0;
    two_minAggregationPeriod = 1;
}
else {
    two_minPrice = 0;
    two_minATR = 0;
    two_minSDev = 0;
    two_minDenom = 0;
    two_minDenomLo = 0;
    two_minDenomHi = 0;
    two_minBBSInd = 0;
    two_minBBSIndLo = 0;
    two_minBBSIndHi = 0;
    two_minSqueeze = 0;
    two_minPreSqueeze = 0;
    two_minExtraSqueeze = 0;
    two_minAggregationPeriod = 0;
}
AddLabel(TwoMinLabel and two_minAggregationPeriod, "2m", if two_minSqueeze then GlobalColor("Squeeze") else if two_minExtraSqueeze then GlobalColor("ExtraSqueeze") else if two_minPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));


def one_minPrice;
def one_minATR;
def one_minSDev;
def one_minDenom;
def one_minDenomLo;
def one_minDenomHi;
def one_minBBSInd;
def one_minBBSIndLo;
def one_minBBSIndHi;
def one_minSqueeze;
def one_minPreSqueeze;
def one_minExtraSqueeze;
def one_minAggregationPeriod;

if GetAggregationPeriod() <= AggregationPeriod.MIN {
    one_minPrice = close(period = "1 Min");
    one_minATR = Average(TrueRange(high (period = "1 Min"), close(period = "1 Min"), low(period = "1 Min")), length);
    one_minSDev = StDev(one_minPrice, length);
    one_minDenom = (nk * one_minATR);
    one_minDenomLo = (nkLo * one_minATR);
    one_minDenomHi = (nkHi * one_minATR);
    one_minBBSInd = If (one_minDenom <> 0, ((nBB * one_minSDev) / one_minDenom), 0);
    one_minBBSIndLo = If (one_minDenomLo <> 0, ((nBB * one_minSDev) / one_minDenomLo), 0);
    one_minBBSIndHi = If (one_minDenomHi <> 0, ((nBB * one_minSDev) / one_minDenomHi), 0);
    one_minSqueeze = if one_minBBSInd < AlertLine then 1 else 0;
    one_minPreSqueeze = if one_minBBSIndHi < AlertLine then 1 else 0;
    one_minExtraSqueeze = if one_minBBSIndLo < AlertLine then 1 else 0;
    one_minAggregationPeriod = 1;
}
else {
    one_minPrice = 0;
    one_minATR = 0;
    one_minSDev = 0;
    one_minDenom = 0;
    one_minDenomLo = 0;
    one_minDenomHi = 0;
    one_minBBSInd = 0;
    one_minBBSIndLo = 0;
    one_minBBSIndHi = 0;
    one_minSqueeze = 0;
    one_minPreSqueeze = 0;
    one_minExtraSqueeze = 0;
    one_minAggregationPeriod = 0;
}
AddLabel(OneMinLabel and one_minAggregationPeriod, "1m", if one_minSqueeze then GlobalColor("Squeeze") else if one_minExtraSqueeze then GlobalColor("ExtraSqueeze") else if one_minPreSqueeze then GlobalColor("PreSqueeze") else GlobalColor("No Squeeze"));
