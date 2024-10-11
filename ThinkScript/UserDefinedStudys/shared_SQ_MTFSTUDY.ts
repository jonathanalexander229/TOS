# the script develped by laketrader trying to replicate multitimeframe squeeze
# indicator as an alternative to the overpriced internet version. 
# TTM squeeze code is not available on TOS  but luckily Mobius provided a excellent
# replication of TTM squeeze on onedrive. Thus, the squeeze logic was based on Mobius's 
# code.
#
# changing the first line dStr to diffeent timeframe will switch to different timeframe. 
# e.g.
# dStr = "Weekly" wil change to weekly squeeze

# input dStr ="Day";
input dStr =aggregationPeriod.DAY;


script MySqueeze{
def length  = 20;
def AtrMult = 1.5;
def SdMult  = 2.0;

input period = aggregationPeriod.DAY;;


def valueClose   =  close(period = period);
def valueHigh   =  high(period = period);
def valueLow   =  low(period = period);

def SD = StDev(valueClose, length);

def Avg = Average(valueClose, length);

def ATR = Average(TrueRange(valueHigh, valueClose, valueLow), length);

def SDup = Avg + (SdMult * SD);

def ATRup = Avg + (AtrMult * ATR);



plot Squeeze = if SDup < ATRup  

               then 1 

               else 0;


}
 

def dSQ= MySqueeze(dStr);
# AddLabel(yes, dStr, if dSQ
# then  Color.RED else  Color.GREEN); # display label red if has squeeze
AddLabel(yes, dStr, if dSQ then Color.RED else Color.GREEN);

