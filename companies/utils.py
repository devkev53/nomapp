from pays.models import Payment

def exucute_prepaid_each(employees, day, month, year):
    total = 0
    for employee in employees:
        employe_payment = Payment.objects.create(
          employee=employee,
          amount=employee.calculate_prepaid(),
          day=day,
          month=month,
          year=year,
          type='1'
        )
        total += 1
        print(employe_payment)
    return total

def exucute_month_each(employees, day, month, year):
    total = 0
    for employee in employees:
        employe_payment = Payment.objects.create(
          employee=employee,
          amount=employee.calculate_monthPayment(),
          day=day,
          month=month,
          year=year,
          type='2'
        )
        total += 1
        print(employe_payment)
    return total
