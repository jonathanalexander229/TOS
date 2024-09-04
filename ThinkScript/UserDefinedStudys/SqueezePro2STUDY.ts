declare lower;

##Assembled by TheBewb using existing Mobius Squeeze Momentum coding and "squeeze" concept made popular by John Carter.

input price = close;
input length = 20;
input BB_STD = 2.0;
input averageType = AverageType.SIMPLE;
input displace = 0;
def sDev = StDev(data = price[-displace], length = length);
def MidLineBB = MovingAverage(averageType, data = price[-displace], length = length);
def LowerBandBB = MidLineBB - BB_STD * sDev;
def UpperBandBB = MidLineBB + BB_STD * sDev;
input factorhigh = 1.0;
input factormid = 1.5;
input factorlow = 2.0;
input trueRangeAverageType = AverageType.SIMPLE;

input showPresqueeze = yes;
input showOriginalSqueeze = yes;
input showExtremeSqueeze = yes;
input squeeze_alert = yes;

## Add configurable color inputs for squeeze line
DefineGlobalColor("SqueezeLinePresqueeze", Color.DARK_ORANGE);
DefineGlobalColor("SqueezeLineOriginal", Color.YELLOW);
DefineGlobalColor("SqueezeLineExtreme", Color.RED);
DefineGlobalColor("SqueezeLineNeutral", Color.GRAY);


def shifthigh = factorhigh * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), length);
def shiftMid = factormid * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), length);
def shiftlow = factorlow * MovingAverage(trueRangeAverageType, TrueRange(high, close, low), length);
def average = MovingAverage(averageType, price, length);

def Avg = average[-displace];

def UpperBandKCLow = average[-displace] + shiftlow[-displace];
def LowerBandKCLow = average[-displace] - shiftlow[-displace];

def UpperBandKCMid = average[-displace] + shiftMid[-displace];
def LowerBandKCMid = average[-displace] - shiftMid[-displace];

def UpperBandKCHigh = average[-displace] + shifthigh[-displace];
def LowerBandKCHigh = average[-displace] - shifthigh[-displace];

def K = (Highest(high, length) + Lowest(low, length)) /
2 + ExpAverage(close, length);
def momo = Inertia(price - K / 2, length);

def pos         = momo >= 0;
def neg         = momo < 0;
def up         = momo >= momo[1];
def dn         = momo < momo[1];

def presqueeze      = LowerBandBB > LowerBandKCLow and UpperBandBB < UpperBandKCLow and showPresqueeze;
def originalSqueeze     = LowerBandBB > LowerBandKCMid and UpperBandBB < UpperBandKCMid and showOriginalSqueeze;
def ExtrSqueeze     = LowerBandBB > LowerBandKCHigh and UpperBandBB < UpperBandKCHigh and showExtremeSqueeze;

def PosUp = pos and up;
def PosDn = pos and dn;
def NegDn = neg and dn;
def NegUp = neg and up;

plot squeezeline = 0;
squeezeline.SetPaintingStrategy(PaintingStrategy.POINTS);

## Update the color assignment for squeezeline
squeezeline.AssignValueColor(
    if ExtrSqueeze then GlobalColor("SqueezeLineExtreme") 
    else if originalSqueeze then GlobalColor("SqueezeLineOriginal") 
    else if presqueeze then GlobalColor("SqueezeLinePresqueeze") 
    else GlobalColor("SqueezeLineNeutral")
);

plot momentum = momo;
momentum.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
momentum.AssignValueColor( if PosUp then Color.GREEN else if PosDn then Color.DARK_GREEN else if NegDn then Color.DARK_ORANGE else if NegUp then Color.YELLOW else Color.YELLOW);

# Alert
Alert(presqueeze and squeeze_alert, "Extra Sequeeze", Alert.BAR, Sound.Chimes);
Alert(originalSqueeze and squeeze_alert, "Extra Sequeeze", Alert.BAR, Sound.Chimes);
Alert(ExtrSqueeze and squeeze_alert, "Extra Sequeeze", Alert.BAR, Sound.Chimes);


