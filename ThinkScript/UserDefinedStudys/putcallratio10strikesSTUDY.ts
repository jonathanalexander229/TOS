# Put/Call Ratio for Strikes Above and Below Current Close

declare lower;

def series = 1;
def CurrentYear = GetYear();
def CurrentMonth = GetMonth();
def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
def Day1DOW1 = GetDayOfWeek(CurrentYear * 10000 + CurrentMonth * 100 + 1);
def FirstFridayDOM1 = if Day1DOW1 < 6 then 6 - Day1DOW1 else if Day1DOW1 == 6 then 7 else 6;
def RollDOM = FirstFridayDOM1 + 14;
def ExpMonth1 = if RollDOM > CurrentDOM then CurrentMonth + series - 1 else CurrentMonth + series;
def ExpMonth2 = if ExpMonth1 > 12 then ExpMonth1 - 12 else ExpMonth1;
def ExpYear = if ExpMonth1 > 12 then CurrentYear + 1 else CurrentYear;
def Day1DOW = GetDayOfWeek(ExpYear * 10000 + ExpMonth2 * 100 + 1);
def FirstFridayDOM = if Day1DOW < 6 then 6 - Day1DOW else if Day1DOW == 6 then 7 else 6;
def ExpDOM = FirstFridayDOM + 14;
def date = ExpYear * 10000 + ExpMonth2 * 100 + ExpDOM + 1;

def currentClose = close;
def Strike = Round(currentClose / 0.5, 0) * 0.5;
def strikeRange = 10;  # Number of strikes above and below

# Calculate total put and call open interest for the specified strikes using fold
def putOpenInterestTotal = fold i = -strikeRange to strikeRange with ptotal = 0 do
    ptotal + (if !IsNaN(open_interest("." + GetUnderlyingSymbol() + (ExpYear - 2000) + (if ExpMonth2 < 10 then "0" else "") + AsText(ExpMonth2) + AsText(ExpDOM) + "P" + AsText(Strike + i))) 
              then open_interest("." + GetUnderlyingSymbol() + (ExpYear - 2000) + (if ExpMonth2 < 10 then "0" else "") + AsText(ExpMonth2) + AsText(ExpDOM) + "P" + AsText(Strike + i)) 
              else 0);

def callOpenInterestTotal = fold j = -strikeRange to strikeRange with ctotal = 0 do
    ctotal + (if !IsNaN(open_interest("." + GetUnderlyingSymbol() + (ExpYear - 2000) + (if ExpMonth2 < 10 then "0" else "") + AsText(ExpMonth2) + AsText(ExpDOM) + "C" + AsText(Strike + j))) 
              then open_interest("." + GetUnderlyingSymbol() + (ExpYear - 2000) + (if ExpMonth2 < 10 then "0" else "") + AsText(ExpMonth2) + AsText(ExpDOM) + "C" + AsText(Strike + j)) 
              else 0);

def PutTotal = putOpenInterestTotal;
def CallTotal = callOpenInterestTotal;

AddLabel(yes, concat("Ex date: ", concat(ExpMonth2, concat("/", concat(ExpDOM, concat("/", AsPrice(ExpYear)))))), color.white);
AddLabel(yes, Concat("ATM Put/Call Ratio ", Round(PutTotal / CallTotal, 2)) + " / 1", Color.White);

def PV = if IsNaN(PutTotal) then PV[1] else PutTotal;
def CV = if IsNaN(CallTotal) then CV[1] else CallTotal;

plot ChangeRatio = if IsNaN(close) then Double.NaN else PV / CV;
ChangeRatio.AssignValueColor(if ChangeRatio > 1 then color.green else color.red);
plot AvgCR = if IsNaN(close) then Double.NaN else Average(ChangeRatio, 5);
AvgCR.SetDefaultColor(Color.Yellow);
plot Neutral = if IsNaN(close) then Double.NaN else 1;
Neutral.SetDefaultColor(Color.Gray);
