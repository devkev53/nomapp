from decimal import Decimal

def calculate_socialSecurity(salary):
  amount = "{:.2f}".format((Decimal(salary) * Decimal(4.83)) / 100)
  return amount