import numpy as np
from databaseProcesses import *
from datetime import date


class Product:
    def __init__(self, category='', name='', price=0.0, time=date.today()):
        self.category = category
        self.priority = 5
        # on a scale from 1 to 10
        self.name = name
        self.time = time

    def set_product(self, name , price, time):
        self.name = name 
        self.price = price
        self.time = time

    def update_product(self, price=None, quantity=None, time=None):

        if price is None:
            price = self.prices[self.updateCounter - 1]
        if quantity is None:
            quantity = self.quantity[self.updateCounter - 1]
        if time is None:
            time = self.timeStamp[self.updateCounter - 1]
        self.updateCounter += 1
        self.set_product(price, quantity, time)

    def get_average_price(self):

        return self.totalPrices / self.updateCounter
        # Avp = average_price = sum of prices / # prices
        # se face dupa set_products

    def average_price_change(self):
        if self.timeStamp[self.updateCounter - 1] == self.timeStamp[0]:
            return 0
        return (self.prices[self.updateCounter - 1] - self.prices[0]) / \
               (self.timeStamp[self.updateCounter - 1] - self.timeStamp[0])
        # ACP = average price change = (price[i] - price[0]) / (t[i] - t[0])
        # se face dupa set_product

    def get_average_daily_distribution(self):
        if date.today() == self.timeStamp[0]:
            return 0
        
        return (self.totalQuantity - self.quantity[self.updateCounter - 1]) / \
               (date.today() - self.timeStamp[0])
        # D = Average daily_Distribution = total_quantity without the last buy / (time passed from the first buy)
        # se face dupa set_product

    def get_days_until_empty(self):
        avg = self.get_average_daily_distribution()
        if avg != 0:
            if (round(self.quantity[len(self.quantity) - 1] // avg)  - (date.today() - self.timeStamp[len(self.timeStamp) - 1])) < 0:
                return 0
            else:
                return (round(self.quantity[len(self.quantity) - 1] // avg)  - (date.today() - self.timeStamp[len(self.timeStamp) - 1]))

    def get_future_price(self, time):

        # returneaza coeficientii polinomului de interpolare
        def coeficiente(x, y):

            x = np.array(x, dtype=np.float32)
            y = np.array(y, dtype=np.float32)
            n = len(x)
            F = np.zeros((n, n), dtype=float)
            b = np.zeros(n)
            for i in range(0, n):
                F[i, 0] = y[i]
            for j in range(1, n):
                for i in range(j, n):
                    F[i, j] = float(F[i, j - 1] - F[i - 1, j - 1]) / float(x[i] - x[i - j])
            for i in range(0, n):
                b[i] = F[i, i]
            return np.array(b)  # return an array of coefficient

        # returneaza valoarea polinomului de interpolare in punctul r
        def eval(x, y, r):
            a = coeficiente(x, y)
            a.astype(float)
            n = len(a) - 1
            temp = a[n]
            for i in range(n - 1, -1, -1):
                temp = temp * (r - x[i]) + a[i]
            return abs(temp)  # return the y_value interpolation

        return eval(self.timeStamp, self.prices, time)
        # returneaza pretul unui obiect la momentul de timp time

    def get_expense_over_a_week(self):

        avgDailyDistr = self.get_average_daily_distribution()
        ans = 0.0


        for index in range(1, 8):
            ans += avgDailyDistr * self.get_future_price(absoluteTime + index)
        return abs(ans)

    def get_expense_over_a_month(self):
        return 4 * self.get_expense_over_a_week()

    def get_expense_over_a_day(self):
        avgDailyDistr = self.get_average_daily_distribution()
        return (avgDailyDistr * self.get_future_price(absoluteTime + 1))

        # e(x) = Expense of product x over a week = FP(T+1) * D + FP(T + 2) * D +... + FP(T+7) * D

    def update_priority(self, value):
        self.priority += value
        if self.priority > 10 :
            self.priority = 10
        if self.priority < 0:
            self.priority = 0

    def set_priority(self, value):
        self.priority = value

    def to_dict(self):
        ans = dict()
        ans['updateCounter'] = self.updateCounter
        ans['totalQuantity'] = self.totalQuantity
        ans['totalPrices'] = self.totalPrices
        ans['quantity'] = self.quantity
        ans['timeStamp'] = self.timeStamp
        ans['prices'] = self.prices
        ans['name'] = self.name
        return ans

    def set_from_dict(self, obj):
        self.updateCounter = obj['updateCounter']
        self.totalQuantity = obj['totalQuanitity']
        self.totalPrices = obj['totalPrices']
        self.quantity = obj['quantity']
        self.timeStamp = obj['timeStamp']
        self.prices = obj['prices']
        self.name = obj['name']

    def get_usage(self):
        return self.updateCounter / absoluteTime