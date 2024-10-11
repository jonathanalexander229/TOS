# Put/Call
# 11.9.2019

declare lower;
     
    def series = 1;
    def CurrentYear = GetYear();
    def CurrentMonth = GetMonth();
    def CurrentDOM = GetDayOfMonth(GetYYYYMMDD());
    def Day1DOW1 = GetDayOfWeek(CurrentYear * 10000 + CurrentMonth * 100 + 1);
    def FirstFridayDOM1 = if Day1DOW1 < 6
                          then 6 - Day1DOW1
                          else if Day1DOW1 == 6
                          then 7
                          else 6;
    def RollDOM = FirstFridayDOM1 + 14;
    def ExpMonth1 = if RollDOM > CurrentDOM
                    then CurrentMonth + series - 1
                    else CurrentMonth + series;
    def ExpMonth2 = if ExpMonth1 > 12
                    then ExpMonth1 - 12
                    else ExpMonth1;
    def ExpYear = if ExpMonth1 > 12
                  then CurrentYear + 1
                  else CurrentYear;
    def Day1DOW = GetDayOfWeek(ExpYear * 10000 + ExpMonth2 * 100 + 1);
    def FirstFridayDOM = if Day1DOW < 6
                         then 6 - Day1DOW
                         else if Day1DOW == 6
                         then 7
                         else 6;
    def ExpDOM = FirstFridayDOM + 14;
    def date = ExpYear * 10000 + ExpMonth2 * 100 + ExpDOM + 1;
    def PutVolume = if isNaN(volume(symbol = GetATMOption(GetUnderlyingSymbol(), date, OptionClass.PUT)))
                    then PutVolume[1]
                    else volume(symbol = GetATMOption(GetUnderlyingSymbol(), date, OptionClass.PUT));
    def CallVolume = if isNaN(volume(symbol = GetATMOption(GetUnderlyingSymbol(), date, OptionClass.CALL)))
                     then CallVolume[1]
                     else volume(symbol = GetATMOption(GetUnderlyingSymbol(), date, OptionClass.CALL));
    def PutTotal = PutVolume;
    def CallTotal = CallVolume;
AddLabel(yes,(concat("Ex date: ",
              concat(ExpMonth2,
              concat("/",
              concat(ExpDOM,
              concat("/",
              concat(AsPrice(ExpYear),""))))))), color.white);
   def Strike = Round(close(symbol = GetUnderlyingSymbol()) / .5, 0) * .5;
AddLabel(1, "Strikes " + GetUnderlyingSymbol() + ": $" + Strike, Color.White);
AddLabel(yes, Concat("ATM Put/Call Ratio ", Round(PutTotal / CallTotal, 2)) + " / 1", Color.White);
   def PV = if IsNaN(PutTotal)
            then PV[1]
            else PutTotal;
   def CV = if IsNaN(CallTotal)
            then CV[1]
            else CallTotal;
plot ChangeRatio = if isNaN(close) then Double.NaN else PV / CV;
     ChangeRatio.AssignValueColor(if ChangeRatio > 1
                 then color.green
                 else color.red);
plot AvgCR = if isNaN(close) then Double.NaN else Average(ChangeRatio, 5);
     AvgCR.SetDefaultColor(Color.Yellow);
plot Neutral = if isNaN(close) then Double.NaN else 1;
     Neutral.SetDefaultColor(Color.Gray);
# End Study
