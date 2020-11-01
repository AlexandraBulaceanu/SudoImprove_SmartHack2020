from flask import Flask, render_template, url_for, flash, redirect,request
#from forms import RegistrationForm, LoginForm
from secrets import token_hex
from os import *
from random import choice, randint
from main import *
from flask import jsonify

#global time
time = 4

#product_list

product_list = [
    {"product": "Miere", "quantity":1, "forecast":7},
    {"product": "Nuci", "quantity":2, "forecast":5},
    {"product": "Alune", "quantity":1, "forecast":5},
    {"product": "Ciocolata", "quantity":3, "forecast":10},
    {"product": "Apa", "quantity":2, "forecast":1},
    {"product": "Paine", "quantity":2, "forecast":1}
]



#daily_list

#fiecare din urmatoarele lista contine un dictionar cu name, average_price si monthly_expense
#si sunt liste cu produse cumparate zilnic, sapt, lunar
print('-----------------------------------------------')
daily_list = Site.get_items_list(Site.security("Bob"), 'daily') 
weekly_list = Site.get_items_list(Site.security("Bob"), 'weekly')
monthly_list = Site.get_items_list(Site.security("Bob"), 'monthly')

#cele 3 expensuri pe care trebuie sa le pui in html
daily_expense = Site.get_daily_forecast(Site.security("Bob"))
weekly_expense = Site.get_week_forecast(Site.security("Bob"))
monthly_expense = Site.get_month_forecast(Site.security("Bob"))

remove_list = Site.get_remove_list(Site.security("Bob"))

print(weekly_list)

print('-----------------------------------------------')


#https://stackoverflow.com/questions/31002890/how-to-reference-a-html-template-from-a-different-directory-in-python-flask/31003097

workingDirectory = path.dirname(__file__)

app = Flask(__name__, template_folder=workingDirectory)

productName =["miere", "geaca", "nuci", "baloane"]
posts = []

for i in range(10):
    posts.append({"product": choice(productName), "quantity": randint(2, 30), "forecast": randint(5, 10)})



@app.route("/", methods =['GET','POST'])
def hello_world():
    global daily_expense
    global weekly_expense
    global monthly_expense
    print("ginutaginutaginutaginutaginutaginutaginutaginutaginutaginutaginutaginuta")
    print(daily_expense)
    return render_template("dummy.html", posts=product_list, 
    daily_budget = daily_expense, weekly_budget = weekly_expense, 
    monthly_budget = monthly_expense)


@app.route("/post", methods =['GET','POST'])
def worker():
    global time 
    global Site

    # iti adauga 
    time += 1
    data = request.get_json()
    
    Site.add_product(Site.security("Bob"), "unknown", data['product'], float(data['price']), int(data['quantity']), time)
    #print(Site.get_daily_forecast(Site.security("Bob")))

    if Site.get_days_left(Site.security("Bob"))[data['product']]:

        if Site.get_days_left(Site.security("Bob"))[data['product']] == 1:
            data['forecast'] = str(Site.get_days_left(Site.security("Bob"))[data['product']]) + " day"
        else:
            data['forecast'] = str(Site.get_days_left(Site.security("Bob"))[data['product']]) + " days"

    else:
        data['forecast'] = "Not known yet"

    daily_list = Site.get_items_list(Site.security("Bob"), 'daily') 
    weekly_list = Site.get_items_list(Site.security("Bob"), 'weekly')
    monthly_list = Site.get_items_list(Site.security("Bob"), 'monthly')

    #cele 3 expensuri pe care trebuie sa le pui in html
    global daily_expense
    global weekly_expense
    global monthly_expense
    daily_expense = round(Site.get_daily_forecast(Site.security("Bob")), 2)
    weekly_expense = round(Site.get_week_forecast(Site.security("Bob")), 2)
    monthly_expense = round(Site.get_month_forecast(Site.security("Bob")), 2)
    print("gandalfgandalfgandalfgandalfgandalfgandalfgandalfgandalfgandalfgandalf")
    print(daily_expense)

    product_list.append(data)
    print(Site.get_items_list(Site.security("Bob")))

    #print(Site.get_week_forecast(Site.security("Bob")))

    return redirect('/')

@app.route('/daily')
def show():
    return render_template("dummy_budget.html", posts=daily_list, 
    daily_budget = daily_expense, weekly_budget = weekly_expense, 
    monthly_budget = monthly_expense) 


@app.route('/weekly')
def show2():
    return render_template("dummy_budget.html", 
    posts=weekly_list, daily_budget = daily_expense, 
    weekly_budget = weekly_expense, monthly_budget = monthly_expense) 

@app.route('/monthly')
def show3():
    return render_template("dummy_budget.html", posts=monthly_list, 
    daily_budget = daily_expense, weekly_budget = weekly_expense, 
    monthly_budget = monthly_expense) 


@app.route('/list', methods = ['GET'])
def foo():

    global product_list
    aux = [x["quantity"] for x in product_list]
    sum = 0.0
    for el in aux:
        sum += int(el)
    print("gandalf")
    d = dict()
    for x in product_list:
        if (x['product'] in d.keys()):
            d[x['product']] += x['quantity']
        else:
            d[x['product']] = x['quantity']
        
    print(d)
    auxprod = []
    #print (sum)
    for x in d.keys():
        el = {'product' : x, 'quantity' : round(int(d[x]) / sum * 100, 2)}
        print(el)
        auxprod += [el]
        #auxprod += [{'product' : x['product'], 'quantity' : (x['quantity'] / sum * 100), 'forecast' : x['forecast']}]
    #print(auxprod)
    return render_template("dummy_list.html", posts = auxprod, daily_budget = daily_expense, 
    weekly_budget = weekly_expense, monthly_budget = monthly_expense)

if __name__ == "__main__":
 
    app.run(debug=True, use_reloader=True)
