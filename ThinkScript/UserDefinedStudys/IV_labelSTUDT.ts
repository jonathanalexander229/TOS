input days_back = 252; # we usually do this over one year (252 trading days)

# implied volatility
# using proxies for futures
def df1 = imp_volatility(period = AggregationPeriod.DAY);

# display regular implied volatility
# ---------------------------
AddLabel(yes, "IV: " + Round(df1 * 100.0, 0), Color.ORANGE);

# calculate the IV rank
# ---------------------------
# calculate the IV rank
def low_over_timespan = Lowest(df1, days_back);
def high_over_timespan = Highest(df1, days_back);

def iv_rank = Round( (df1 - low_over_timespan) / (high_over_timespan - low_over_timespan) * 100.0, 0);
#plot IVRank = iv_rank;
#IVRank.SetDefaultColor(Color.GRAY);
AddLabel(yes, "IVR: " + iv_rank, Color.WHITE);

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
#plot IVPercentile = iv_percentile;
#IVPercentile.SetDefaultColor(Color.GREEN);
AddLabel(yes, "IV%: " + iv_percentile, Color.WHITE);

# AddCloud(iv_rank, iv_percentile, Color.PINK, Color.YELLOW);

#my edits for IVR 30 and 50 levels of when to put on Strangles
#Also added color and line weight settings
#plot minRank =30;
#minRank.SetLineWeight(2);
#minRank.SetDefaultColor(color = Color.Red);
#Plot midRank =50;
#midRank.SetLineWeight(2);
#midRank.SetDefaultColor(color = Color.LIGHT_GREEN);

#label to alert when IVR greater than 30 and 50

#def minRankLevel = if iv_rank >minRank then Yes else No;