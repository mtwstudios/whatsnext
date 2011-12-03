from datetime import date, timedelta

class DatesUtil:

    @staticmethod
    def nextsunday():
        d = date.today()
        d += timedelta(days = 6 - d.weekday())    
        
        return d
