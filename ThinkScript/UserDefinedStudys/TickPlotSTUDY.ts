#welkincall@gmail.com
declare lower;

input alerttype = Alert.BAR;
input alertsound = Sound.DING;
input alertThreshold = 1000;

plot zeroline = 0;
plot tick500 = 500;
plot tick500m = -500;
plot tick1000 = 1000;
plot tick1000m = -1000;

DefineGlobalColor("Vertical Line Color", Color.WHITE);

def NA = Double.NaN;
def ticko = open("$TICK");
plot tickc = close("$TICK");
plot tickh = high("$TICK");
plot tickl = low("$TICK");

def tickh1000test = tickh >= alertThreshold;
def tickl1000test = tickl <= -alertThreshold;
Alert(tickh1000test, " >+1000 $TICK", alerttype, alertsound);
Alert(tickl1000test, " <-1000 $TICK", alerttype, alertsound);
AddVerticalLine(tickh1000test, "+"+alertThreshold, GlobalColor("Vertical Line Color"));
AddVerticalLine(tickl1000test, "-"+alertThreshold, GlobalColor("Vertical Line Color"));

def PCALL = Round(close("$PCALL"),2);
def NYSEUVOL = close("$UVOL");
def NYSEDVOL = close("$DVOL");

def BR = Round(if NYSEUVOL >= NYSEDVOL then NYSEUVOL / NYSEDVOL else -(NYSEDVOL/NYSEUVOL),2);
AddLabel(1,"$TICK: "+ tickc, if tickc > 0 then Color.GREEN else Color.RED);
AddLabel(1,"BR: " + BR ,if BR > 0 then Color.GREEN else Color.RED);
AddLabel(1,"$PCALL: " + PCALL, if PCALL > .7 then Color.RED else Color.GREEN);
# AddLabel(1, "VIX: "+ close("VIX"), Color.GRAY);
def vix = close("VIX");
def vixMa = Average(vix, 20);
def vixAboveMa = vix > vixMa;
def vixBelowMa = vix <= vixMa;

AddLabel(1, "VIX: " + vix, if vixAboveMa then Color.RED else if vixBelowMa then Color.GREEN else Color.GRAY);

zeroline.SetDefaultColor(Color.BLACK);
tick500.SetDefaultColor(Color.GRAY);
tick500m.SetDefaultColor(Color.GRAY);
tick1000.SetDefaultColor(Color.GRAY);
tick1000m.SetDefaultColor(Color.GRAY);
tick1000.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
tick1000m.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
tick1000.SetLineWeight(2);
tick1000m.SetLineWeight(2);

tickh.SetPaintingStrategy(PaintingStrategy.Squared_HISTOGRAM);
tickh.SetDefaultColor(CreateColor(0,100,200));
tickl.SetPaintingStrategy(PaintingStrategy.Squared_HISTOGRAM);
tickl.SetDefaultColor(Color.DARK_ORANGE);
tickc.SetPaintingStrategy(PaintingStrategy.HISTOGRAM);
tickc.AssignValueColor(if tickc > 0 then color.green else color.red);
