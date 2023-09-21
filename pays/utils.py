from decimal import Decimal

def calculate_socialSecurity(salary):
  amount = (Decimal(salary) * Decimal(4.83)) / 100
  return amount