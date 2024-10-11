# Put/Call Ratio for Strikes Above and Below Current Close

declare lower;

input strikeRange = 5;  # Number of strikes above and below
input strikeSpacing = 1;  # Dollar amount between strikes

def CurrentYear = GetYear();
def CurrentMonth = GetMonth();
def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
def currentClose = close;
def closestStrike = Round(currentClose / strikeSpacing, 0) * strikeSpacing;

# Calculate total put and call open interest for the specified strikes using fold
def putOpenInterestTotal = fold i = -strikeRange to strikeRange with ptotal = 0 do
    ptotal + (if !IsNaN(open_interest("." + GetUnderlyingSymbol() + (CurrentYear - 2000) + (if CurrentMonth < 10 then "0" else "") + AsText(CurrentMonth) + AsText(CurrentDOM) + "P" + AsText(closestStrike + (i * strikeSpacing))) )
              then open_interest("." + GetUnderlyingSymbol() + (CurrentYear - 2000) + (if CurrentMonth < 10 then "0" else "") + AsText(CurrentMonth) + AsText(CurrentDOM) + "P" + AsText(closestStrike + (i * strikeSpacing))) 
              else 0);

def callOpenInterestTotal = fold j = -strikeRange to strikeRange with ctotal = 0 do
    ctotal + (if !IsNaN(open_interest("." + GetUnderlyingSymbol() + (CurrentYear - 2000) + (if CurrentMonth < 10 then "0" else "") + AsText(CurrentMonth) + AsText(CurrentDOM) + "C" + AsText(closestStrike + (j * strikeSpacing))) )
              then open_interest("." + GetUnderlyingSymbol() + (CurrentYear - 2000) + (if CurrentMonth < 10 then "0" else "") + AsText(CurrentMonth) + AsText(CurrentDOM) + "C" + AsText(closestStrike + (j * strikeSpacing))) 
              else 0);

def PutTotal = putOpenInterestTotal;
def CallTotal = callOpenInterestTotal;

AddLabel(yes, concat("Closest Strike: ", AsPrice(closestStrike)), color.white);
AddLabel(yes, Concat("ATM Put/Call Ratio ", Round(PutTotal / CallTotal, 2)) + " / 1", Color.White);

def PV = if IsNaN(PutTotal) then PV[1] else PutTotal;
def CV = if IsNaN(CallTotal) then CV[1] else CallTotal;

plot ChangeRatio = if IsNaN(close) then Double.NaN else PV / CV;
ChangeRatio.AssignValueColor(if ChangeRatio > 1 then color.green else color.red);
plot AvgCR = if IsNaN(close) then Double.NaN else Average(ChangeRatio, 5);
AvgCR.SetDefaultColor(Color.Yellow);
plot Neutral = if IsNaN(close) then Double.NaN else 1;
Neutral.SetDefaultColor(Color.Gray);
