INSERT INTO department 
    (name)
VALUES 
    ("Engineering"), 
    ("Accounting"), 
    ("Sales");

INSERT INTO role 
    (title, salary, department_id)
VALUES 
    ("Jr. Engineer", 60000, 1), 
    ("Engineer", 80000, 1), 
    ("Sr. Engineer", 100000, 1), 
    ("Director of Engineering", 125000, 1), 
    ("Jr. Accountant", 60000, 2), 
    ("Accountant", 80000, 2), 
    ("Sr. Accountant", 100000, 2), 
    ("Director of Accounting", 125000, 2), 
    ("Jr. Salesman", 60000, 3), 
    ("Salesman", 80000, 3), 
    ("Sr. Salesman", 100000, 3), 
    ("Director of Sales", 125000, 3);

INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES 
    ("Brianna", "Hebeler", 1, 4), 
    ("George", "Smith", 2, 4), 
    ("Julio", "Mendez", 3, 4), 
    ("Joe", "Han", 4, null), 
    ("Larry", "Maloney", 5, 8), 
    ("Chris", "Soleberry", 6, 8), 
    ("Samantha", "Tran", 7, 8), 
    ("Drew", "Jefferson", 8, null), 
    ("Ryan", "Howard", 9, 12), 
    ("Andy", "Bernard", 10, 12), 
    ("Jim", "Halpert", 11, 12), 
    ("Dwight", "Schrute", 12, null);
