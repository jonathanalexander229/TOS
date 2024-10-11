## OneNote Archive Name: IV Rank and IV Percentile Plots _TT
## Archive Section: Volatility
## Suggested Tos Name using JQ naming convention: IV_Rank_IV_Percentile_TT
## Archive Date: 10.22.2018
## Archive Notes:
## End OneNote Archive Header.  Script follows.

# tastytrade/dough
# m.r. v1.6
#
# plots both IV Rank and IV Percentile
#
# IV Rank is a description of where the current IV lies in comparison to its yearly high and low IV
# IV Percentile tells the percentage of days over the last year, that were below the current IV
#
# for information on the two, see Skinny on Options Data Science, titled "IV Rank and IV Percentile"
# http://ontt.tv/1Nt4fcS

declare lower;
declare hide_on_intraday;
input days_back = 252; # we usually do this over one year (252 trading days)

# implied volatility
# using proxies for futures
def df = if (GetSymbol() == "/ES") then close("VIX") / 100
else if (GetSymbol() == "/CL") then close("OIV") / 100
else if (GetSymbol() == "/GC") then close("GVX") / 100
else if (GetSymbol() == "/SI") then close("VXSLV") / 100
else if (GetSymbol() == "/NQ") then close("VXN") / 100
else if (GetSymbol() == "/TF") then close("RVX") / 100
else if (GetSymbol() == "/YM") then close("VXD") / 100
else if (GetSymbol() == "/6E") then close("EVZ") / 100
else if (GetSymbol() == “/6J”) then close(“JYVIX”) / 100
else if (GetSymbol() == “/6B”) then close(“BPVIX”) / 100
else if (GetSymbol() == “/ZB”) then close(“TLT”) / 100
else if (GetSymbol() == "/ZN") then close(“TYVIX”) / 100
else imp_volatility();


def df1 = if !IsNaN(df) then df else df[-1];

# display regular implied volatility
# ---------------------------
AddLabel(yes, "IV: " + Round(df1 * 100.0, 0), Color.ORANGE);

# calculate the IV rank
# ---------------------------
# calculate the IV rank
def low_over_timespan = Lowest(df1, days_back);
def high_over_timespan = Highest(df1, days_back);

def iv_rank = Round( (df1 - low_over_timespan) / (high_over_timespan - low_over_timespan) * 100.0, 0);
plot IVRank = iv_rank;
IVRank.SetDefaultColor(Color.GRAY);
AddLabel(yes, "IV Rank: " + iv_rank, Color.GREEN);

# calculate the IV percentile
# ---------------------------
# how many times over the past year, has IV been below the current IV
def counts_below = fold i = 1 to days_back + 1 with count = 0
do
  if df1[0] > df1[i] then
    count + 1
  else
    count;

def iv_percentile = Round(counts_below / days_back * 100.0, 0);
plot IVPercentile = iv_percentile;
IVPercentile.SetDefaultColor(Color.GREEN);
AddLabel(yes, "IV Percentile: " + iv_percentile, Color.GREEN);

AddCloud(iv_rank, iv_percentile, Color.PINK, Color.YELLOW);

#my edits for IVR 30 and 50 levels of when to put on Strangles
#Also added color and line weight settings
plot minRank =30;
minRank.SetLineWeight(2);
minRank.SetDefaultColor(color = Color.Red);
Plot midRank =50;
midRank.SetLineWeight(2);
midRank.SetDefaultColor(color = Color.LIGHT_GREEN);

#label to alert when IVR greater than 30 and 50

def minRankLevel = if iv_rank >minRank then Yes else No;

# AddLabel(yes, "Sell Strangle: Green=Sell:  "  + minRankLevel + "",if iv_rank > minRank then Color.GREEN else if iv_rank < minRank then color.Light_Gray else color.LIGHT_GRAY);
