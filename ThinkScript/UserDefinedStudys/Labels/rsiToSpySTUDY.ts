def currentSymbolClose = close;
def spyClose = close("SPY");

declare up;

def rsiToSpy = currentSymbolClose / spyClose;
// ... existing code ...
AddLabel(yes, "Current RSI to SPY Value: " + rsiToSpy, 
    if rsiToSpy < 30 then color.green 
    else if rsiToSpy > 70 then color.red 
    else color.default);
// ... existing code ...