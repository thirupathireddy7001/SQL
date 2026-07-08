const topics = {
    basics: {
        title: "SQL Basics",
        content: `
            <h2>📚 SQL Basics</h2>
            <p>SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. It allows you to create, read, update, and delete data.</p>
            
            <h3>What is SQL?</h3>
            <p>SQL is used to communicate with databases. It's the standard language for relational database management systems (RDBMS) like MySQL, PostgreSQL, Oracle, SQL Server, and SQLite.</p>
            
            <h3>Basic SQL Commands</h3>
            <ul>
                <li><strong>SELECT</strong> - Retrieves data from a database</li>
                <li><strong>INSERT</strong> - Adds new data to a database</li>
                <li><strong>UPDATE</strong> - Modifies existing data</li>
                <li><strong>DELETE</strong> - Removes data from a database</li>
                <li><strong>CREATE</strong> - Creates new tables or databases</li>
                <li><strong>DROP</strong> - Deletes tables or databases</li>
            </ul>
            
            <div class="code-example">
-- Basic SELECT statement
SELECT column1, column2
FROM table_name;

-- SELECT all columns
SELECT * FROM employees;

-- SELECT with WHERE clause
SELECT name, salary
FROM employees
WHERE salary > 50000;
            </div>
            
            <div class="info-box">
                <strong>💡 Tip:</strong> SQL keywords are not case-sensitive, but it's a common convention to write them in UPPERCASE for better readability.
            </div>
            
            <h3>Data Types</h3>
            <ul>
                <li><strong>INT</strong> - Integer numbers</li>
                <li><strong>VARCHAR(n)</strong> - Variable-length strings</li>
                <li><strong>DATE</strong> - Date values</li>
                <li><strong>DECIMAL(p,s)</strong> - Decimal numbers</li>
                <li><strong>BOOLEAN</strong> - True/False values</li>
            </ul>
            
            <h3>🎯 Understanding Example: Library Management</h3>
            <p>Imagine a library database with books, members, and borrowing records:</p>
            <div class="code-example">
-- Create a books table
CREATE TABLE books (
    book_id INT PRIMARY KEY,
    title VARCHAR(200),
    author VARCHAR(100),
    isbn VARCHAR(20),
    available_copies INT
);

-- Insert sample data
INSERT INTO books VALUES
(1, 'The Great Gatsby', 'F. Scott Fitzgerald', '978-0743273565', 3),
(2, '1984', 'George Orwell', '978-0451524935', 5);

-- Query available books
SELECT title, author, available_copies
FROM books
WHERE available_copies > 0;
            </div>
            
            <h3>🏢 Real-Time Project Example 1: E-Commerce Product Catalog</h3>
            <div class="code-example">
-- Product management system
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10,2),
    stock_quantity INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add products
INSERT INTO products (product_name, category, price, stock_quantity)
VALUES
('iPhone 15 Pro', 'Electronics', 999.99, 50),
('Samsung Galaxy S24', 'Electronics', 899.99, 30),
('Nike Air Max', 'Footwear', 129.99, 100);

-- Get low stock products for reordering
SELECT product_name, stock_quantity
FROM products
WHERE stock_quantity < 20
ORDER BY stock_quantity ASC;
            </div>
            
            <h3>🏢 Real-Time Project Example 2: User Authentication System</h3>
            <div class="code-example">
-- User management for web application
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Register new user
INSERT INTO users (username, email, password_hash)
VALUES ('john_doe', 'john@example.com', 'hashed_password_here');

-- Check if user exists during login
SELECT user_id, username, is_active
FROM users
WHERE email = 'john@example.com' AND is_active = TRUE;

-- Update last login time
UPDATE users
SET last_login = CURRENT_TIMESTAMP
WHERE user_id = 1;
            </div>
        `
    },
    
    select: {
        title: "SELECT Statement",
        content: `
            <h2>🔍 SELECT Statement</h2>
            <p>The SELECT statement is the most commonly used SQL command. It retrieves data from one or more tables.</p>
            
            <h3>Basic Syntax</h3>
            <div class="code-example">
SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column
LIMIT number;
            </div>
            
            <h3>SELECT Examples</h3>
            <div class="code-example">
-- Select specific columns
SELECT first_name, last_name, email
FROM customers;

-- Select with alias
SELECT first_name AS "First Name",
       last_name AS "Last Name"
FROM customers;

-- Select distinct values
SELECT DISTINCT country
FROM customers;

-- Select with calculations
SELECT product_name,
       price,
       price * 0.9 AS discounted_price
FROM products;
            </div>
            
            <h3>WHERE Clause Operators</h3>
            <ul>
                <li><strong>=</strong> - Equal to</li>
                <li><strong>!=</strong> or <strong><></strong> - Not equal to</li>
                <li><strong>></strong> - Greater than</li>
                <li><strong><</strong> - Less than</li>
                <li><strong>>=</strong> - Greater than or equal to</li>
                <li><strong><=</strong> - Less than or equal to</li>
                <li><strong>BETWEEN</strong> - Between a range</li>
                <li><strong>LIKE</strong> - Pattern matching</li>
                <li><strong>IN</strong> - Match any value in a list</li>
            </ul>
            
            <div class="code-example">
-- Using WHERE with different operators
SELECT * FROM employees
WHERE salary BETWEEN 40000 AND 60000;

SELECT * FROM customers
WHERE country IN ('USA', 'Canada', 'Mexico');

SELECT * FROM products
WHERE product_name LIKE 'A%';  -- Starts with 'A'
            </div>
            
            <div class="success-box">
                <strong>✅ Best Practice:</strong> Always use WHERE clause when you need specific data to avoid retrieving unnecessary rows.
            </div>
            
            <h3>🎯 Understanding Example: Restaurant Menu Query</h3>
            <p>Think of a restaurant database. You want to find all vegetarian dishes under $15.</p>
            <div class="code-example">
-- Find affordable vegetarian options
SELECT dish_name, price, category
FROM menu_items
WHERE is_vegetarian = TRUE
  AND price < 15
ORDER BY price ASC;

-- Find dishes with specific ingredients
SELECT dish_name, ingredients
FROM menu_items
WHERE ingredients LIKE '%chicken%'
ORDER BY dish_name;
            </div>
            
            <h3>🏢 Real-Time Project Example 1: E-Commerce Product Search</h3>
            <div class="code-example">
-- Advanced product search with multiple filters
SELECT
    product_id,
    product_name,
    brand,
    category,
    price,
    stock_quantity,
    rating,
    CASE
        WHEN stock_quantity > 50 THEN 'In Stock'
        WHEN stock_quantity > 0 THEN 'Low Stock'
        ELSE 'Out of Stock'
    END AS availability_status
FROM products
WHERE category IN ('Electronics', 'Computers')
  AND price BETWEEN 500 AND 2000
  AND rating >= 4.0
  AND stock_quantity > 0
  AND is_active = TRUE
ORDER BY
    CASE WHEN featured = TRUE THEN 0 ELSE 1 END,
    rating DESC,
    price ASC
LIMIT 20;
            </div>
            
            <h3>🏢 Real-Time Project Example 2: User Activity Report</h3>
            <div class="code-example">
-- Get active users with their activity summary
SELECT
    u.user_id,
    u.username,
    u.email,
    u.last_login,
    DATEDIFF(CURRENT_DATE, u.last_login) AS days_since_login,
    CASE
        WHEN u.last_login >= DATE_SUB(CURRENT_DATE, INTERVAL 7 DAY) THEN 'Active'
        WHEN u.last_login >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY) THEN 'Inactive'
        ELSE 'Dormant'
    END AS user_status
FROM users u
WHERE u.is_active = TRUE
  AND u.email_verified = TRUE
ORDER BY u.last_login DESC
LIMIT 100;
            </div>
        `
    },
    
    joins: {
        title: "SQL JOINs",
        content: `
            <h2>🔗 SQL JOINs</h2>
            <p>JOINs are used to combine rows from two or more tables based on a related column between them.</p>
            
            <h3>🎯 Understanding Example: School Database</h3>
            <p>Think of two tables: Students and Classes. JOINs help us answer questions like "Which students are enrolled in which classes?"</p>
            <div class="code-example">
-- Students table
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    grade INT
);

-- Enrollments table
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    class_name VARCHAR(100),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

-- Get students with their enrolled classes
SELECT s.name, e.class_name
FROM students s
INNER JOIN enrollments e ON s.student_id = e.student_id;
            </div>
            
            <h3>Types of JOINs</h3>
            
            <div class="diagram">
                <div class="diagram-title">JOIN Types Visualization</div>
                <div class="join-diagram">
                    <div class="table-box">
                        <h4>Table A</h4>
                        <table>
                            <tr><td>ID</td><td>Name</td></tr>
                            <tr><td>1</td><td>John</td></tr>
                            <tr><td>2</td><td>Jane</td></tr>
                            <tr><td>3</td><td>Bob</td></tr>
                        </table>
                    </div>
                    <div class="arrow">⟷</div>
                    <div class="table-box">
                        <h4>Table B</h4>
                        <table>
                            <tr><td>ID</td><td>Dept</td></tr>
                            <tr><td>1</td><td>IT</td></tr>
                            <tr><td>2</td><td>HR</td></tr>
                            <tr><td>4</td><td>Sales</td></tr>
                        </table>
                    </div>
                </div>
            </div>
            
            <h3>1. INNER JOIN</h3>
            <p>Returns only matching rows from both tables.</p>
            <div class="code-example">
SELECT employees.name, departments.dept_name
FROM employees
INNER JOIN departments ON employees.dept_id = departments.id;

-- Result: Only employees with matching departments
            </div>
            
            <h3>2. LEFT JOIN (LEFT OUTER JOIN)</h3>
            <p>Returns all rows from the left table and matching rows from the right table. NULL for non-matches.</p>
            <div class="code-example">
SELECT customers.name, orders.order_id
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;

-- Result: All customers, even those without orders
            </div>
            
            <h3>3. RIGHT JOIN (RIGHT OUTER JOIN)</h3>
            <p>Returns all rows from the right table and matching rows from the left table.</p>
            <div class="code-example">
SELECT orders.order_id, customers.name
FROM orders
RIGHT JOIN customers ON orders.customer_id = customers.id;

-- Result: All customers, even those without orders
            </div>
            
            <h3>4. FULL OUTER JOIN</h3>
            <p>Returns all rows when there's a match in either table.</p>
            <div class="code-example">
SELECT employees.name, departments.dept_name
FROM employees
FULL OUTER JOIN departments ON employees.dept_id = departments.id;

-- Result: All employees and all departments
            </div>
            
            <h3>5. CROSS JOIN</h3>
            <p>Returns the Cartesian product of both tables (every combination).</p>
            <div class="code-example">
SELECT colors.color_name, sizes.size_name
FROM colors
CROSS JOIN sizes;

-- Result: Every color with every size
            </div>
            
            <h3>6. SELF JOIN</h3>
            <p>A table joined with itself.</p>
            <div class="code-example">
-- Find employees and their managers
SELECT e1.name AS employee,
       e2.name AS manager
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.id;
            </div>
            
            <div class="info-box">
                <strong>💡 Key Point:</strong> INNER JOIN is the most commonly used join. Use LEFT JOIN when you need all records from the main table even if there are no matches.
            </div>
            
            <h3>🏢 Real-Time Project Example 1: E-Commerce Order System</h3>
            <div class="code-example">
-- Get customer orders with product details
SELECT
    c.customer_name,
    c.email,
    o.order_id,
    o.order_date,
    p.product_name,
    oi.quantity,
    oi.price,
    (oi.quantity * oi.price) AS line_total
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
WHERE o.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
ORDER BY o.order_date DESC;

-- Find customers who haven't placed orders (LEFT JOIN)
SELECT
    c.customer_id,
    c.customer_name,
    c.email,
    COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, c.email
HAVING COUNT(o.order_id) = 0;
            </div>
            
            <h3>🏢 Real-Time Project Example 2: Social Media Platform</h3>
            <div class="code-example">
-- Get user posts with comments and likes
SELECT
    u.username,
    p.post_id,
    p.content AS post_content,
    p.created_at AS post_date,
    COUNT(DISTINCT c.comment_id) AS comment_count,
    COUNT(DISTINCT l.like_id) AS like_count
FROM users u
INNER JOIN posts p ON u.user_id = p.user_id
LEFT JOIN comments c ON p.post_id = c.post_id
LEFT JOIN likes l ON p.post_id = l.post_id
WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY u.username, p.post_id, p.content, p.created_at
ORDER BY like_count DESC, comment_count DESC
LIMIT 10;

-- Find mutual friends (SELF JOIN)
SELECT DISTINCT
    f1.user_id AS user1,
    f2.user_id AS user2,
    f1.friend_id AS mutual_friend
FROM friendships f1
INNER JOIN friendships f2
    ON f1.friend_id = f2.friend_id
    AND f1.user_id < f2.user_id;
            </div>
        `
    },
    
    subqueries: {
        title: "Subqueries",
        content: `
            <h2>🎯 Subqueries</h2>
            <p>A subquery is a query nested inside another query. It can be used in SELECT, FROM, WHERE, or HAVING clauses.</p>
            
            <h3>🎯 Understanding Example: Finding Above-Average Performers</h3>
            <p>Imagine you want to find employees who earn more than the company average. You need to first calculate the average, then compare each employee's salary to it.</p>
            <div class="code-example">
-- Step 1: Calculate average (subquery)
-- Step 2: Compare each employee to average (outer query)
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- This is cleaner than doing it in two separate queries!
            </div>
            
            <div class="diagram">
                <div class="diagram-title">Subquery Structure</div>
                <div class="subquery-diagram">
                    <div class="table-box">
                        <h4>Outer Query</h4>
                        <p style="font-size: 0.85em;">SELECT * FROM employees WHERE...</p>
                    </div>
                    <div class="arrow">⊃</div>
                    <div class="table-box">
                        <h4>Inner Query (Subquery)</h4>
                        <p style="font-size: 0.85em;">(SELECT AVG(salary) FROM employees)</p>
                    </div>
                </div>
            </div>
            
            <h3>1. Subquery in WHERE Clause</h3>
            <p>Most common use - filter results based on another query.</p>
            <div class="code-example">
-- Find employees earning more than average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- Find employees in IT department
SELECT name
FROM employees
WHERE dept_id = (SELECT id FROM departments WHERE name = 'IT');
            </div>
            
            <h3>2. Subquery in SELECT Clause</h3>
            <p>Calculate values for each row.</p>
            <div class="code-example">
-- Show employee salary and company average
SELECT name,
       salary,
       (SELECT AVG(salary) FROM employees) AS company_avg
FROM employees;
            </div>
            
            <h3>3. Subquery in FROM Clause</h3>
            <p>Create a derived table.</p>
            <div class="code-example">
-- Get department statistics
SELECT dept_name, avg_salary
FROM (
    SELECT dept_id,
           AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
) AS dept_stats
JOIN departments ON dept_stats.dept_id = departments.id;
            </div>
            
            <h3>4. Subquery with IN Operator</h3>
            <div class="code-example">
-- Find customers who placed orders
SELECT name
FROM customers
WHERE id IN (SELECT DISTINCT customer_id FROM orders);
            </div>
            
            <h3>5. Subquery with EXISTS</h3>
            <div class="code-example">
-- Find customers with at least one order
SELECT name
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
);
            </div>
            
            <div class="warning-box">
                <strong>⚠️ Performance Note:</strong> Subqueries can be slower than JOINs. Use JOINs when possible for better performance.
            </div>
            
            <h3>🏢 Real-Time Project Example 1: Analytics Dashboard</h3>
            <div class="code-example">
-- Get top-performing products (above average sales)
SELECT
    product_id,
    product_name,
    (SELECT SUM(quantity)
     FROM order_items oi
     WHERE oi.product_id = p.product_id) AS total_sold,
    price
FROM products p
WHERE (SELECT SUM(quantity)
       FROM order_items oi
       WHERE oi.product_id = p.product_id) >
      (SELECT AVG(total_qty)
       FROM (SELECT SUM(quantity) AS total_qty
             FROM order_items
             GROUP BY product_id) AS product_sales)
ORDER BY total_sold DESC;

-- Find customers with above-average purchase value
SELECT
    customer_id,
    customer_name,
    (SELECT SUM(total_amount)
     FROM orders o
     WHERE o.customer_id = c.customer_id) AS lifetime_value
FROM customers c
WHERE (SELECT SUM(total_amount)
       FROM orders o
       WHERE o.customer_id = c.customer_id) >
      (SELECT AVG(customer_total)
       FROM (SELECT SUM(total_amount) AS customer_total
             FROM orders
             GROUP BY customer_id) AS avg_calc);
            </div>
            
            <h3>🏢 Real-Time Project Example 2: Inventory Management</h3>
            <div class="code-example">
-- Products that need reordering (stock below reorder point)
SELECT
    p.product_id,
    p.product_name,
    p.current_stock,
    p.reorder_level,
    (SELECT AVG(quantity)
     FROM order_items oi
     WHERE oi.product_id = p.product_id
     AND order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)) AS avg_monthly_sales
FROM products p
WHERE p.current_stock < p.reorder_level
AND p.product_id IN (
    SELECT DISTINCT product_id
    FROM order_items
    WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
)
ORDER BY (p.reorder_level - p.current_stock) DESC;
            </div>
        `
    },
    
    nested: {
        title: "Nested Subqueries",
        content: `
            <h2>🔄 Nested Subqueries</h2>
            <p>Nested subqueries are subqueries within subqueries - queries nested at multiple levels.</p>
            
            <h3>🎯 Understanding Example: Tournament Rankings</h3>
            <p>Think of finding the best team in the best league. First find the best league (innermost), then find teams in that league (middle), then get the top team (outer).</p>
            <div class="code-example">
-- Find players from the team with highest average score
SELECT player_name, team_id
FROM players
WHERE team_id = (
    SELECT team_id
    FROM teams
    WHERE avg_score = (
        SELECT MAX(avg_score)
        FROM teams
    )
);
            </div>
            
            <h3>Understanding Nested Subqueries</h3>
            <p>A nested subquery is executed from the innermost query outward. Each level depends on the result of the inner query.</p>
            
            <div class="diagram">
                <div class="diagram-title">Nested Subquery Execution Order</div>
                <div style="text-align: left; max-width: 600px; margin: 0 auto;">
                    <p><strong>Level 3 (Innermost):</strong> Executes first</p>
                    <p style="margin-left: 20px;"><strong>Level 2 (Middle):</strong> Uses Level 3 result</p>
                    <p style="margin-left: 40px;"><strong>Level 1 (Outer):</strong> Uses Level 2 result</p>
                </div>
            </div>
            
            <h3>Example 1: Three-Level Nested Subquery</h3>
            <div class="code-example">
-- Find employees in departments with highest average salary
SELECT name, salary
FROM employees
WHERE dept_id IN (
    SELECT dept_id
    FROM (
        SELECT dept_id, AVG(salary) AS avg_sal
        FROM employees
        GROUP BY dept_id
    ) AS dept_avg
    WHERE avg_sal = (
        SELECT MAX(avg_salary)
        FROM (
            SELECT AVG(salary) AS avg_salary
            FROM employees
            GROUP BY dept_id
        ) AS max_avg
    )
);
            </div>
            
            <h3>Example 2: Correlated Nested Subquery</h3>
            <p>A correlated subquery references columns from the outer query.</p>
            <div class="code-example">
-- Find employees earning more than their department average
SELECT e1.name, e1.salary, e1.dept_id
FROM employees e1
WHERE e1.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.dept_id = e1.dept_id
);
            </div>
            
            <h3>Example 3: Nested Subquery with Multiple Conditions</h3>
            <div class="code-example">
-- Find products in categories with above-average sales
SELECT product_name, category_id
FROM products
WHERE category_id IN (
    SELECT category_id
    FROM (
        SELECT category_id, SUM(quantity) AS total_sales
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY category_id
    ) AS category_sales
    WHERE total_sales > (
        SELECT AVG(total_sales)
        FROM (
            SELECT SUM(quantity) AS total_sales
            FROM order_items
            GROUP BY product_id
        ) AS avg_sales
    )
);
            </div>
            
            <h3>Common Use Cases</h3>
            <ul>
                <li>Finding records that meet complex multi-level criteria</li>
                <li>Comparing values across multiple aggregation levels</li>
                <li>Filtering based on statistical calculations</li>
                <li>Complex data analysis and reporting</li>
            </ul>
            
            <div class="warning-box">
                <strong>⚠️ Performance Warning:</strong> Nested subqueries can be very slow. Consider using:
                <ul>
                    <li>Common Table Expressions (CTEs) with WITH clause</li>
                    <li>Temporary tables</li>
                    <li>Multiple JOINs instead of nested subqueries</li>
                </ul>
            </div>
            
            <h3>Better Alternative: Common Table Expression (CTE)</h3>
            <div class="code-example">
-- Same logic as above, but more readable and efficient
WITH dept_avg AS (
    SELECT dept_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
),
max_dept AS (
    SELECT dept_id
    FROM dept_avg
    WHERE avg_salary = (SELECT MAX(avg_salary) FROM dept_avg)
)
SELECT name, salary
FROM employees
WHERE dept_id IN (SELECT dept_id FROM max_dept);
            </div>
            
            <h3>🏢 Real-Time Project Example 1: Sales Performance Analysis</h3>
            <div class="code-example">
-- Find salespeople who exceeded their region's top performer from last year
SELECT
    s.salesperson_id,
    s.name,
    s.current_year_sales,
    s.region
FROM salespeople s
WHERE s.current_year_sales > (
    SELECT MAX(last_year_sales)
    FROM salespeople
    WHERE region = s.region
    AND salesperson_id IN (
        SELECT salesperson_id
        FROM sales_history
        WHERE year = YEAR(CURRENT_DATE) - 1
        AND performance_rating = (
            SELECT MAX(performance_rating)
            FROM sales_history
            WHERE year = YEAR(CURRENT_DATE) - 1
        )
    )
);
            </div>
            
            <h3>🏢 Real-Time Project Example 2: Student Scholarship Eligibility</h3>
            <div class="code-example">
-- Find students eligible for merit scholarship
-- (GPA above department average, in top-performing departments)
SELECT
    s.student_id,
    s.name,
    s.gpa,
    s.department_id
FROM students s
WHERE s.gpa > (
    SELECT AVG(gpa)
    FROM students
    WHERE department_id = s.department_id
)
AND s.department_id IN (
    SELECT department_id
    FROM (
        SELECT department_id, AVG(gpa) AS dept_avg_gpa
        FROM students
        GROUP BY department_id
    ) AS dept_stats
    WHERE dept_avg_gpa > (
        SELECT AVG(overall_avg)
        FROM (
            SELECT AVG(gpa) AS overall_avg
            FROM students
            GROUP BY department_id
        ) AS university_avg
    )
)
ORDER BY s.gpa DESC;
            </div>
        `
    },
    
    views: {
        title: "Views",
        content: `
            <h2>👁️ SQL Views</h2>
            <p>A view is a virtual table based on the result of a SELECT statement. It doesn't store data but provides a way to simplify complex queries.</p>
            
            <h3>🎯 Understanding Example: Report Simplification</h3>
            <p>Imagine you frequently need employee data with department names. Instead of writing the JOIN every time, create a view once and reuse it!</p>
            <div class="code-example">
-- Create the view once
CREATE VIEW employee_info AS
SELECT e.id, e.name, e.salary, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;

-- Now use it like a regular table
SELECT * FROM employee_info WHERE salary > 50000;
SELECT name, dept_name FROM employee_info WHERE dept_name = 'IT';
            </div>
            
            <div class="diagram">
                <div class="diagram-title">How Views Work</div>
                <div class="view-diagram">
                    <div class="table-box">
                        <h4>Base Tables</h4>
                        <p style="font-size: 0.85em;">employees, departments</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="table-box">
                        <h4>VIEW</h4>
                        <p style="font-size: 0.85em;">Virtual Table</p>
                    </div>
                    <div class="arrow">→</div>
                    <div class="table-box">
                        <h4>Query Result</h4>
                        <p style="font-size: 0.85em;">Data displayed</p>
                    </div>
                </div>
            </div>
            
            <h3>Creating a View</h3>
            <div class="code-example">
-- Create a simple view
CREATE VIEW employee_details AS
SELECT e.name,
       e.salary,
       d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;

-- Use the view
SELECT * FROM employee_details
WHERE salary > 50000;
            </div>
            
            <h3>Benefits of Views</h3>
            <ul>
                <li><strong>Simplification:</strong> Hide complex queries behind simple names</li>
                <li><strong>Security:</strong> Restrict access to specific columns</li>
                <li><strong>Consistency:</strong> Ensure same logic is used across queries</li>
                <li><strong>Abstraction:</strong> Hide underlying table structure</li>
            </ul>
            
            <h3>Types of Views</h3>
            
            <h4>1. Simple View</h4>
            <div class="code-example">
CREATE VIEW high_earners AS
SELECT name, salary
FROM employees
WHERE salary > 100000;
            </div>
            
            <h4>2. Complex View (with JOINs)</h4>
            <div class="code-example">
CREATE VIEW order_summary AS
SELECT o.order_id,
       c.customer_name,
       o.order_date,
       SUM(oi.quantity * oi.price) AS total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, c.customer_name, o.order_date;
            </div>
            
            <h4>3. Updatable View</h4>
            <p>Some views can be updated if they meet certain criteria:</p>
            <div class="code-example">
CREATE VIEW active_employees AS
SELECT id, name, email
FROM employees
WHERE status = 'active';

-- You can update through the view
UPDATE active_employees
SET email = 'new@email.com'
WHERE id = 1;
            </div>
            
            <h3>Managing Views</h3>
            <div class="code-example">
-- Modify a view
CREATE OR REPLACE VIEW employee_details AS
SELECT e.name,
       e.salary,
       e.hire_date,
       d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;

-- Drop a view
DROP VIEW employee_details;

-- Check if view exists
DROP VIEW IF EXISTS employee_details;
            </div>
            
            <h3>Materialized Views</h3>
            <p>Unlike regular views, materialized views store the actual data and need to be refreshed.</p>
            <div class="code-example">
-- Create materialized view (PostgreSQL syntax)
CREATE MATERIALIZED VIEW sales_summary AS
SELECT product_id,
       SUM(quantity) AS total_sold,
       SUM(quantity * price) AS total_revenue
FROM order_items
GROUP BY product_id;

-- Refresh the materialized view
REFRESH MATERIALIZED VIEW sales_summary;
            </div>
            
            <div class="success-box">
                <strong>✅ Best Practice:</strong> Use views to encapsulate complex business logic and provide a consistent interface to your data.
            </div>
            
            <h3>🏢 Real-Time Project Example 1: Customer Dashboard View</h3>
            <div class="code-example">
-- Create comprehensive customer view for dashboard
CREATE VIEW customer_dashboard AS
SELECT
    c.customer_id,
    c.customer_name,
    c.email,
    c.registration_date,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COALESCE(SUM(o.total_amount), 0) AS lifetime_value,
    COALESCE(AVG(o.total_amount), 0) AS avg_order_value,
    MAX(o.order_date) AS last_order_date,
    DATEDIFF(CURRENT_DATE, MAX(o.order_date)) AS days_since_last_order,
    CASE
        WHEN MAX(o.order_date) >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY) THEN 'Active'
        WHEN MAX(o.order_date) >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY) THEN 'At Risk'
        ELSE 'Inactive'
    END AS customer_status
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, c.email, c.registration_date;

-- Use the view for various reports
SELECT * FROM customer_dashboard WHERE customer_status = 'At Risk';
SELECT customer_name, lifetime_value FROM customer_dashboard ORDER BY lifetime_value DESC LIMIT 10;
            </div>
            
            <h3>🏢 Real-Time Project Example 2: Product Inventory View</h3>
            <div class="code-example">
-- Create inventory management view
CREATE VIEW product_inventory_status AS
SELECT
    p.product_id,
    p.product_name,
    p.category,
    p.current_stock,
    p.reorder_level,
    p.unit_cost,
    COALESCE(SUM(oi.quantity), 0) AS total_sold_30days,
    COALESCE(AVG(oi.quantity), 0) AS avg_daily_sales,
    CASE
        WHEN p.current_stock = 0 THEN 'Out of Stock'
        WHEN p.current_stock < p.reorder_level THEN 'Low Stock'
        WHEN p.current_stock < (p.reorder_level * 2) THEN 'Normal'
        ELSE 'Overstocked'
    END AS stock_status,
    CASE
        WHEN p.current_stock > 0 THEN
            FLOOR(p.current_stock / NULLIF(AVG(oi.quantity), 0))
        ELSE 0
    END AS days_of_stock_remaining
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
    AND oi.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY p.product_id, p.product_name, p.category, p.current_stock, p.reorder_level, p.unit_cost;

-- Query the view for reordering decisions
SELECT product_name, current_stock, stock_status, days_of_stock_remaining
FROM product_inventory_status
WHERE stock_status IN ('Out of Stock', 'Low Stock')
ORDER BY days_of_stock_remaining ASC;
            </div>
            
            <h3>🏢 Real-Time Project Example 3: Employee Performance View</h3>
            <div class="code-example">
-- Create employee performance tracking view
CREATE VIEW employee_performance AS
SELECT
    e.employee_id,
    e.name,
    e.department_id,
    d.department_name,
    e.hire_date,
    TIMESTAMPDIFF(YEAR, e.hire_date, CURRENT_DATE) AS years_of_service,
    e.salary,
    COUNT(p.project_id) AS projects_completed,
    AVG(p.rating) AS avg_project_rating,
    SUM(p.hours_worked) AS total_hours_worked,
    CASE
        WHEN AVG(p.rating) >= 4.5 THEN 'Excellent'
        WHEN AVG(p.rating) >= 3.5 THEN 'Good'
        WHEN AVG(p.rating) >= 2.5 THEN 'Average'
        ELSE 'Needs Improvement'
    END AS performance_category
FROM employees e
JOIN departments d ON e.department_id = d.department_id
LEFT JOIN project_assignments pa ON e.employee_id = pa.employee_id
LEFT JOIN projects p ON pa.project_id = p.project_id
WHERE p.status = 'Completed' OR p.status IS NULL
GROUP BY e.employee_id, e.name, e.department_id, d.department_name, e.hire_date, e.salary;

-- Use for performance reviews
SELECT name, department_name, performance_category, avg_project_rating
FROM employee_performance
WHERE performance_category IN ('Excellent', 'Good')
ORDER BY avg_project_rating DESC;
            </div>
        `
    },
    
    indexes: {
        title: "Indexes",
        content: `
            <h2>⚡ SQL Indexes</h2>
            <p>Indexes are special data structures that improve the speed of data retrieval operations. Think of them like a book's index.</p>
            
            <h3>How Indexes Work</h3>
            <p>Without an index, the database must scan every row (full table scan). With an index, it can quickly locate the data.</p>
            
            <div class="diagram">
                <div class="diagram-title">Index Performance Comparison</div>
                <div style="text-align: center;">
                    <p><strong>Without Index:</strong> Scan 1,000,000 rows ❌</p>
                    <p><strong>With Index:</strong> Scan ~20 rows ✅</p>
                    <p style="color: #10b981; font-weight: bold;">50,000x faster!</p>
                </div>
            </div>
            
            <h3>Creating Indexes</h3>
            <div class="code-example">
-- Create a simple index
CREATE INDEX idx_employee_name
ON employees(name);

-- Create a unique index
CREATE UNIQUE INDEX idx_employee_email
ON employees(email);

-- Create a composite index (multiple columns)
CREATE INDEX idx_employee_dept_salary
ON employees(dept_id, salary);
            </div>
            
            <h3>Types of Indexes</h3>
            
            <h4>1. Single-Column Index</h4>
            <div class="code-example">
CREATE INDEX idx_salary ON employees(salary);

-- Speeds up queries like:
SELECT * FROM employees WHERE salary > 50000;
            </div>
            
            <h4>2. Composite Index (Multi-Column)</h4>
            <div class="code-example">
CREATE INDEX idx_dept_salary ON employees(dept_id, salary);

-- Speeds up queries like:
SELECT * FROM employees
WHERE dept_id = 5 AND salary > 50000;
            </div>
            
            <h4>3. Unique Index</h4>
            <div class="code-example">
CREATE UNIQUE INDEX idx_email ON employees(email);

-- Ensures no duplicate emails
            </div>
            
            <h4>4. Full-Text Index</h4>
            <div class="code-example">
-- MySQL syntax
CREATE FULLTEXT INDEX idx_description
ON products(description);

-- Search using full-text
SELECT * FROM products
WHERE MATCH(description) AGAINST('laptop computer');
            </div>
            
            <h3>When to Use Indexes</h3>
            <div class="success-box">
                <strong>✅ Use indexes when:</strong>
                <ul>
                    <li>Column is frequently used in WHERE clauses</li>
                    <li>Column is used in JOIN conditions</li>
                    <li>Column is used in ORDER BY or GROUP BY</li>
                    <li>Table has many rows</li>
                    <li>Column has high cardinality (many unique values)</li>
                </ul>
            </div>
            
            <div class="warning-box">
                <strong>⚠️ Avoid indexes when:</strong>
                <ul>
                    <li>Table is small (< 1000 rows)</li>
                    <li>Column has low cardinality (few unique values)</li>
                    <li>Table has frequent INSERT/UPDATE/DELETE operations</li>
                    <li>Column is rarely used in queries</li>
                </ul>
            </div>
            
            <h3>Index Management</h3>
            <div class="code-example">
-- View indexes on a table
SHOW INDEX FROM employees;

-- Drop an index
DROP INDEX idx_employee_name ON employees;

-- Analyze index usage
EXPLAIN SELECT * FROM employees WHERE name = 'John';
            </div>
            
            <h3>Index Performance Tips</h3>
            <ul>
                <li>Don't over-index - each index slows down writes</li>
                <li>Index columns used in WHERE, JOIN, ORDER BY</li>
                <li>Put most selective column first in composite indexes</li>
                <li>Regularly analyze and rebuild indexes</li>
                <li>Monitor query performance with EXPLAIN</li>
            </ul>
            
            <h3>🏢 Real-Time Project Example 1: E-Commerce Search Optimization</h3>
            <div class="code-example">
-- Product search is slow without indexes
-- Create indexes for common search patterns

-- Index for product name searches
CREATE INDEX idx_product_name ON products(product_name);

-- Composite index for category + price filtering
CREATE INDEX idx_category_price ON products(category_id, price);

-- Full-text index for description search
CREATE FULLTEXT INDEX idx_product_description ON products(description);

-- Index for sorting by popularity
CREATE INDEX idx_sales_rank ON products(total_sales DESC);

-- Now these queries are lightning fast:
SELECT * FROM products WHERE product_name LIKE 'iPhone%';
SELECT * FROM products WHERE category_id = 5 AND price BETWEEN 100 AND 500;
SELECT * FROM products WHERE MATCH(description) AGAINST('wireless bluetooth');
SELECT * FROM products ORDER BY total_sales DESC LIMIT 20;

-- Check index usage
EXPLAIN SELECT * FROM products WHERE category_id = 5 AND price < 100;
            </div>
            
            <h3>🏢 Real-Time Project Example 2: User Authentication System</h3>
            <div class="code-example">
-- Optimize login queries with strategic indexes

-- Unique index on email (used for login)
CREATE UNIQUE INDEX idx_user_email ON users(email);

-- Index on username (alternative login method)
CREATE UNIQUE INDEX idx_username ON users(username);

-- Composite index for active user lookups
CREATE INDEX idx_email_active ON users(email, is_active);

-- Index for session management
CREATE INDEX idx_session_token ON user_sessions(session_token);
CREATE INDEX idx_session_expiry ON user_sessions(expires_at);

-- Fast login query
SELECT user_id, password_hash, is_active
FROM users
WHERE email = 'user@example.com' AND is_active = TRUE;

-- Fast session validation
SELECT user_id FROM user_sessions
WHERE session_token = 'abc123' AND expires_at > NOW();
            </div>
            
            <h3>🏢 Real-Time Project Example 3: Analytics Dashboard</h3>
            <div class="code-example">
-- Optimize reporting queries with proper indexes

-- Date range queries (very common in analytics)
CREATE INDEX idx_order_date ON orders(order_date);
CREATE INDEX idx_created_at ON transactions(created_at);

-- Composite indexes for grouped reports
CREATE INDEX idx_date_status ON orders(order_date, status);
CREATE INDEX idx_date_customer ON orders(order_date, customer_id);

-- Foreign key indexes for JOINs
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_orderitem_order ON order_items(order_id);
CREATE INDEX idx_orderitem_product ON order_items(product_id);

-- Fast dashboard queries
SELECT DATE(order_date) AS date, COUNT(*) AS orders, SUM(total_amount) AS revenue
FROM orders
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY DATE(order_date);

-- Customer purchase history (uses multiple indexes)
SELECT o.order_id, o.order_date, o.total_amount
FROM orders o
WHERE o.customer_id = 12345
ORDER BY o.order_date DESC
LIMIT 10;
            </div>
        `
    },
    
    transactions: {
        title: "Transactions",
        content: `
            <h2>🔒 SQL Transactions</h2>
            <p>A transaction is a sequence of operations performed as a single logical unit of work. Either all operations succeed, or all fail.</p>
            
            <h3>🎯 Understanding Example: Online Shopping Cart</h3>
            <p>When you checkout: (1) Deduct items from inventory, (2) Create order, (3) Charge payment. If payment fails, we must undo inventory changes!</p>
            <div class="code-example">
BEGIN TRANSACTION;

-- Step 1: Reduce inventory
UPDATE products SET stock = stock - 1 WHERE product_id = 101;

-- Step 2: Create order
INSERT INTO orders (customer_id, total) VALUES (5, 99.99);

-- Step 3: Process payment
INSERT INTO payments (order_id, amount) VALUES (LAST_INSERT_ID(), 99.99);

-- If all succeed, save everything
COMMIT;

-- If any step fails, undo everything
-- ROLLBACK;
            </div>
            
            <h3>ACID Properties</h3>
            <div class="info-box">
                <strong>A</strong>tomicity - All or nothing<br>
                <strong>C</strong>onsistency - Valid state before and after<br>
                <strong>I</strong>solation - Concurrent transactions don't interfere<br>
                <strong>D</strong>urability - Changes are permanent
            </div>
            
            <h3>Transaction Commands</h3>
            <div class="code-example">
-- Start a transaction
BEGIN TRANSACTION;
-- or
START TRANSACTION;

-- Perform operations
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Commit (save changes)
COMMIT;

-- Or rollback (undo changes)
ROLLBACK;
            </div>
            
            <h3>Example: Bank Transfer</h3>
            <div class="code-example">
BEGIN TRANSACTION;

-- Deduct from sender
UPDATE accounts
SET balance = balance - 500
WHERE account_id = 'A123';

-- Add to receiver
UPDATE accounts
SET balance = balance + 500
WHERE account_id = 'B456';

-- Check if both succeeded
IF @@ERROR = 0
    COMMIT;
ELSE
    ROLLBACK;
            </div>
            
            <h3>Savepoints</h3>
            <p>Create checkpoints within a transaction to rollback to specific points.</p>
            <div class="code-example">
BEGIN TRANSACTION;

INSERT INTO orders VALUES (1, 'Product A');
SAVEPOINT sp1;

INSERT INTO orders VALUES (2, 'Product B');
SAVEPOINT sp2;

INSERT INTO orders VALUES (3, 'Product C');

-- Rollback to sp2 (keeps first two inserts)
ROLLBACK TO sp2;

COMMIT;
            </div>
            
            <h3>Isolation Levels</h3>
            <div class="code-example">
-- Set isolation level
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Levels (from least to most strict):
-- READ UNCOMMITTED - Can read uncommitted changes
-- READ COMMITTED - Only read committed changes
-- REPEATABLE READ - Same read results in transaction
-- SERIALIZABLE - Complete isolation
            </div>
            
            <div class="warning-box">
                <strong>⚠️ Common Issues:</strong>
                <ul>
                    <li><strong>Dirty Read:</strong> Reading uncommitted data</li>
                    <li><strong>Non-Repeatable Read:</strong> Data changes between reads</li>
                    <li><strong>Phantom Read:</strong> New rows appear between reads</li>
                    <li><strong>Deadlock:</strong> Two transactions waiting for each other</li>
                </ul>
            </div>
            
            <h3>🏢 Real-Time Project Example 1: E-Commerce Order Processing</h3>
            <div class="code-example">
-- Complete order processing with transaction
BEGIN TRANSACTION;

-- 1. Create order record
INSERT INTO orders (customer_id, order_date, status, total_amount)
VALUES (12345, NOW(), 'pending', 299.97);

SET @order_id = LAST_INSERT_ID();

-- 2. Add order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
    (@order_id, 101, 2, 49.99),
    (@order_id, 205, 1, 199.99);

-- 3. Update product inventory
UPDATE products SET stock_quantity = stock_quantity - 2 WHERE product_id = 101;
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE product_id = 205;

-- 4. Record payment
INSERT INTO payments (order_id, payment_method, amount, status)
VALUES (@order_id, 'credit_card', 299.97, 'completed');

-- 5. Update order status
UPDATE orders SET status = 'confirmed' WHERE order_id = @order_id;

-- 6. Create shipping record
INSERT INTO shipments (order_id, status, created_at)
VALUES (@order_id, 'pending', NOW());

-- If everything succeeds, commit
COMMIT;

-- If any step fails, rollback everything
-- ROLLBACK;
            </div>
            
            <h3>🏢 Real-Time Project Example 2: Banking Transfer System</h3>
            <div class="code-example">
-- Money transfer between accounts with full audit trail
BEGIN TRANSACTION;

-- Check sender has sufficient balance
SELECT @sender_balance := balance FROM accounts WHERE account_id = 'ACC001' FOR UPDATE;

IF @sender_balance >= 1000 THEN
    -- Deduct from sender
    UPDATE accounts
    SET balance = balance - 1000,
        updated_at = NOW()
    WHERE account_id = 'ACC001';
    
    -- Add to receiver
    UPDATE accounts
    SET balance = balance + 1000,
        updated_at = NOW()
    WHERE account_id = 'ACC002';
    
    -- Log transaction
    INSERT INTO transaction_log (from_account, to_account, amount, transaction_type, timestamp)
    VALUES ('ACC001', 'ACC002', 1000, 'transfer', NOW());
    
    -- Create notifications
    INSERT INTO notifications (account_id, message, created_at)
    VALUES
        ('ACC001', 'Transfer of $1000 sent to ACC002', NOW()),
        ('ACC002', 'Transfer of $1000 received from ACC001', NOW());
    
    COMMIT;
ELSE
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient funds';
END IF;
            </div>
            
            <h3>🏢 Real-Time Project Example 3: Booking System with Savepoints</h3>
            <div class="code-example">
-- Hotel booking with multiple steps and savepoints
BEGIN TRANSACTION;

-- Step 1: Create reservation
INSERT INTO reservations (customer_id, check_in, check_out, status)
VALUES (789, '2024-07-01', '2024-07-05', 'pending');

SET @reservation_id = LAST_INSERT_ID();
SAVEPOINT after_reservation;

-- Step 2: Book rooms
INSERT INTO room_bookings (reservation_id, room_id, date)
SELECT @reservation_id, 101, date
FROM (
    SELECT DATE_ADD('2024-07-01', INTERVAL n DAY) AS date
    FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3) AS numbers
) AS dates;

SAVEPOINT after_rooms;

-- Step 3: Add services (optional)
INSERT INTO service_bookings (reservation_id, service_id, quantity)
VALUES (@reservation_id, 5, 2);  -- Spa service

-- If service booking fails, rollback only services
-- ROLLBACK TO after_rooms;

-- Step 4: Process payment
INSERT INTO payments (reservation_id, amount, payment_status)
VALUES (@reservation_id, 800.00, 'completed');

-- Step 5: Send confirmation
UPDATE reservations SET status = 'confirmed' WHERE reservation_id = @reservation_id;

COMMIT;
            </div>
        `
    },
    
    functions: {
        title: "Aggregate Functions",
        content: `
            <h2>📊 Aggregate Functions</h2>
            <p>Aggregate functions perform calculations on multiple rows and return a single value.</p>
            
            <h3>🎯 Understanding Example: Class Grade Analysis</h3>
            <p>A teacher wants to know: How many students? What's the average grade? Highest and lowest scores? Aggregate functions answer these!</p>
            <div class="code-example">
-- Analyze student performance
SELECT
    COUNT(*) AS total_students,
    AVG(grade) AS average_grade,
    MAX(grade) AS highest_grade,
    MIN(grade) AS lowest_grade,
    SUM(grade) AS total_points
FROM student_grades
WHERE subject = 'Mathematics';

-- Result: 30 students, 85.5 avg, 98 max, 65 min, 2565 total
            </div>
            
            <h3>Common Aggregate Functions</h3>
            
            <h4>1. COUNT()</h4>
            <p>Counts the number of rows.</p>
            <div class="code-example">
-- Count all rows
SELECT COUNT(*) FROM employees;

-- Count non-NULL values
SELECT COUNT(email) FROM employees;

-- Count distinct values
SELECT COUNT(DISTINCT department) FROM employees;
            </div>
            
            <h4>2. SUM()</h4>
            <p>Calculates the sum of numeric values.</p>
            <div class="code-example">
-- Total salary expense
SELECT SUM(salary) AS total_salary
FROM employees;

-- Sum by department
SELECT department, SUM(salary) AS dept_total
FROM employees
GROUP BY department;
            </div>
            
            <h4>3. AVG()</h4>
            <p>Calculates the average value.</p>
            <div class="code-example">
-- Average salary
SELECT AVG(salary) AS avg_salary
FROM employees;

-- Average by department
SELECT department, AVG(salary) AS avg_dept_salary
FROM employees
GROUP BY department;
            </div>
            
            <h4>4. MIN() and MAX()</h4>
            <p>Find minimum and maximum values.</p>
            <div class="code-example">
-- Salary range
SELECT MIN(salary) AS lowest_salary,
       MAX(salary) AS highest_salary
FROM employees;

-- Earliest and latest hire dates
SELECT MIN(hire_date) AS first_hire,
       MAX(hire_date) AS latest_hire
FROM employees;
            </div>
            
            <h3>GROUP BY Clause</h3>
            <p>Groups rows with same values for aggregate calculations.</p>
            <div class="code-example">
-- Count employees by department
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- Multiple aggregates
SELECT department,
       COUNT(*) AS count,
       AVG(salary) AS avg_salary,
       MAX(salary) AS max_salary
FROM employees
GROUP BY department;
            </div>
            
            <h3>HAVING Clause</h3>
            <p>Filters groups (use after GROUP BY).</p>
            <div class="code-example">
-- Departments with more than 5 employees
SELECT department, COUNT(*) AS emp_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

-- Departments with average salary > 60000
SELECT department, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
            </div>
            
            <h3>String Aggregate Functions</h3>
            <div class="code-example">
-- Concatenate values (MySQL)
SELECT department,
       GROUP_CONCAT(name) AS employees
FROM employees
GROUP BY department;

-- String aggregation (PostgreSQL)
SELECT department,
       STRING_AGG(name, ', ') AS employees
FROM employees
GROUP BY department;
            </div>
            
            <div class="success-box">
                <strong>✅ Remember:</strong>
                <ul>
                    <li>WHERE filters rows before grouping</li>
                    <li>HAVING filters groups after grouping</li>
                    <li>Aggregate functions ignore NULL values (except COUNT(*))</li>
                </ul>
            </div>
            
            <h3>🏢 Real-Time Project Example 1: Sales Dashboard</h3>
            <div class="code-example">
-- Comprehensive sales analytics
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    COUNT(DISTINCT order_id) AS total_orders,
    COUNT(DISTINCT customer_id) AS unique_customers,
    SUM(total_amount) AS total_revenue,
    AVG(total_amount) AS avg_order_value,
    MAX(total_amount) AS largest_order,
    MIN(total_amount) AS smallest_order,
    SUM(CASE WHEN status = 'completed' THEN total_amount ELSE 0 END) AS completed_revenue,
    SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) AS cancelled_orders,
    ROUND(AVG(total_amount), 2) AS avg_revenue_per_order
FROM orders
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
HAVING total_revenue > 10000
ORDER BY month DESC;

-- Product performance analysis
SELECT
    p.category,
    COUNT(DISTINCT oi.product_id) AS products_sold,
    SUM(oi.quantity) AS total_units_sold,
    SUM(oi.quantity * oi.price) AS total_revenue,
    AVG(oi.price) AS avg_price,
    MAX(oi.quantity) AS max_quantity_per_order
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
WHERE oi.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY p.category
ORDER BY total_revenue DESC;
            </div>
            
            <h3>🏢 Real-Time Project Example 2: Customer Segmentation</h3>
            <div class="code-example">
-- RFM Analysis (Recency, Frequency, Monetary)
SELECT
    customer_id,
    customer_name,
    COUNT(order_id) AS purchase_frequency,
    SUM(total_amount) AS total_spent,
    AVG(total_amount) AS avg_order_value,
    MAX(order_date) AS last_purchase_date,
    DATEDIFF(CURRENT_DATE, MAX(order_date)) AS days_since_last_purchase,
    CASE
        WHEN COUNT(order_id) >= 10 AND SUM(total_amount) >= 1000 THEN 'VIP'
        WHEN COUNT(order_id) >= 5 AND SUM(total_amount) >= 500 THEN 'Loyal'
        WHEN COUNT(order_id) >= 2 THEN 'Regular'
        ELSE 'New'
    END AS customer_segment
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY customer_id, customer_name
HAVING COUNT(order_id) > 0
ORDER BY total_spent DESC;

-- Customer lifetime value by acquisition channel
SELECT
    c.acquisition_channel,
    COUNT(DISTINCT c.customer_id) AS total_customers,
    SUM(o.total_amount) AS total_revenue,
    AVG(o.total_amount) AS avg_order_value,
    SUM(o.total_amount) / COUNT(DISTINCT c.customer_id) AS avg_customer_lifetime_value,
    COUNT(o.order_id) / COUNT(DISTINCT c.customer_id) AS avg_orders_per_customer
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.acquisition_channel
ORDER BY avg_customer_lifetime_value DESC;
            </div>
            
            <h3>🏢 Real-Time Project Example 3: Inventory & Supply Chain Analytics</h3>
            <div class="code-example">
-- Warehouse inventory summary
SELECT
    w.warehouse_name,
    w.location,
    COUNT(DISTINCT i.product_id) AS unique_products,
    SUM(i.quantity) AS total_units,
    SUM(i.quantity * p.unit_cost) AS total_inventory_value,
    AVG(i.quantity) AS avg_stock_per_product,
    SUM(CASE WHEN i.quantity < p.reorder_level THEN 1 ELSE 0 END) AS low_stock_items,
    SUM(CASE WHEN i.quantity = 0 THEN 1 ELSE 0 END) AS out_of_stock_items
FROM warehouses w
JOIN inventory i ON w.warehouse_id = i.warehouse_id
JOIN products p ON i.product_id = p.product_id
GROUP BY w.warehouse_id, w.warehouse_name, w.location
ORDER BY total_inventory_value DESC;

-- Supplier performance metrics
SELECT
    s.supplier_name,
    COUNT(DISTINCT po.purchase_order_id) AS total_orders,
    SUM(po.total_amount) AS total_purchase_value,
    AVG(DATEDIFF(po.delivery_date, po.order_date)) AS avg_delivery_days,
    SUM(CASE WHEN po.status = 'delivered_on_time' THEN 1 ELSE 0 END) AS on_time_deliveries,
    ROUND(SUM(CASE WHEN po.status = 'delivered_on_time' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS on_time_percentage,
    AVG(po.quality_rating) AS avg_quality_rating
FROM suppliers s
JOIN purchase_orders po ON s.supplier_id = po.supplier_id
WHERE po.order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)
GROUP BY s.supplier_id, s.supplier_name
HAVING COUNT(DISTINCT po.purchase_order_id) >= 5
ORDER BY on_time_percentage DESC, avg_quality_rating DESC;
            </div>
        `
    },
    
    window: {
        title: "Window Functions",
        content: `
            <h2>🪟 Window Functions</h2>
            <p>Window functions perform calculations across rows related to the current row, without collapsing rows like GROUP BY.</p>
            
            <h3>Basic Syntax</h3>
            <div class="code-example">
SELECT column1,
       column2,
       FUNCTION() OVER (
           PARTITION BY column3
           ORDER BY column4
           ROWS BETWEEN ... AND ...
       ) AS result
FROM table_name;
            </div>
            
            <h3>Ranking Functions</h3>
            
            <h4>1. ROW_NUMBER()</h4>
            <p>Assigns unique sequential numbers.</p>
            <div class="code-example">
SELECT name,
       salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM employees;

-- Result: 1, 2, 3, 4, 5...
            </div>
            
            <h4>2. RANK()</h4>
            <p>Assigns ranks with gaps for ties.</p>
            <div class="code-example">
SELECT name,
       salary,
       RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;

-- Result: 1, 2, 2, 4, 5... (gap after tie)
            </div>
            
            <h4>3. DENSE_RANK()</h4>
            <p>Assigns ranks without gaps.</p>
            <div class="code-example">
SELECT name,
       salary,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- Result: 1, 2, 2, 3, 4... (no gap after tie)
            </div>
            
            <h3>Aggregate Window Functions</h3>
            <div class="code-example">
-- Running total
SELECT date,
       amount,
       SUM(amount) OVER (ORDER BY date) AS running_total
FROM sales;

-- Department average alongside individual salary
SELECT name,
       department,
       salary,
       AVG(salary) OVER (PARTITION BY department) AS dept_avg
FROM employees;
            </div>
            
            <h3>PARTITION BY</h3>
            <p>Divides result set into partitions.</p>
            <div class="code-example">
-- Rank within each department
SELECT name,
       department,
       salary,
       RANK() OVER (
           PARTITION BY department
           ORDER BY salary DESC
       ) AS dept_rank
FROM employees;
            </div>
            
            <h3>LAG() and LEAD()</h3>
            <p>Access previous or next row values.</p>
            <div class="code-example">
-- Compare with previous month
SELECT month,
       revenue,
       LAG(revenue) OVER (ORDER BY month) AS prev_month,
       revenue - LAG(revenue) OVER (ORDER BY month) AS difference
FROM monthly_sales;

-- Look ahead to next row
SELECT name,
       salary,
       LEAD(salary) OVER (ORDER BY salary) AS next_salary
FROM employees;
            </div>
            
            <h3>FIRST_VALUE() and LAST_VALUE()</h3>
            <div class="code-example">
-- Compare with highest salary in department
SELECT name,
       department,
       salary,
       FIRST_VALUE(salary) OVER (
           PARTITION BY department
           ORDER BY salary DESC
       ) AS highest_in_dept
FROM employees;
            </div>
            
            <h3>Frame Specification</h3>
            <div class="code-example">
-- Moving average (3-row window)
SELECT date,
       sales,
       AVG(sales) OVER (
           ORDER BY date
           ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
       ) AS moving_avg
FROM daily_sales;

-- Cumulative sum
SELECT date,
       amount,
       SUM(amount) OVER (
           ORDER BY date
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS cumulative_sum
FROM transactions;
            </div>
            
            <div class="info-box">
                <strong>💡 Key Difference:</strong> Window functions don't collapse rows like GROUP BY. Each row retains its identity while having access to aggregate information.
            </div>
            
            <h3>🏢 Real-Time Project Example 1: Sales Leaderboard & Performance Tracking</h3>
            <div class="code-example">
-- Sales team leaderboard with rankings and comparisons
SELECT
    salesperson_id,
    salesperson_name,
    region,
    monthly_sales,
    -- Overall ranking
    RANK() OVER (ORDER BY monthly_sales DESC) AS overall_rank,
    DENSE_RANK() OVER (ORDER BY monthly_sales DESC) AS overall_dense_rank,
    -- Regional ranking
    RANK() OVER (PARTITION BY region ORDER BY monthly_sales DESC) AS regional_rank,
    -- Running total
    SUM(monthly_sales) OVER (ORDER BY monthly_sales DESC) AS running_total,
    -- Percentage of total sales
    ROUND(monthly_sales * 100.0 / SUM(monthly_sales) OVER (), 2) AS pct_of_total,
    -- Compare to regional average
    AVG(monthly_sales) OVER (PARTITION BY region) AS regional_avg,
    monthly_sales - AVG(monthly_sales) OVER (PARTITION BY region) AS diff_from_regional_avg
FROM sales_performance
WHERE year = 2024 AND month = 6;

-- Top 3 products per category
SELECT *
FROM (
    SELECT
        product_name,
        category,
        total_sales,
        ROW_NUMBER() OVER (PARTITION BY category ORDER BY total_sales DESC) AS rank_in_category
    FROM product_sales
) ranked
WHERE rank_in_category <= 3;
            </div>
            
            <h3>🏢 Real-Time Project Example 2: Financial Analysis & Trends</h3>
            <div class="code-example">
-- Revenue analysis with moving averages and growth rates
SELECT
    date,
    daily_revenue,
    -- Cumulative revenue
    SUM(daily_revenue) OVER (ORDER BY date) AS cumulative_revenue,
    -- 7-day moving average
    AVG(daily_revenue) OVER (
        ORDER BY date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7day,
    -- Compare to previous day
    LAG(daily_revenue, 1) OVER (ORDER BY date) AS prev_day_revenue,
    daily_revenue - LAG(daily_revenue, 1) OVER (ORDER BY date) AS day_over_day_change,
    -- Compare to same day last week
    LAG(daily_revenue, 7) OVER (ORDER BY date) AS same_day_last_week,
    -- Highest revenue so far
    MAX(daily_revenue) OVER (ORDER BY date) AS highest_revenue_to_date
FROM daily_revenue
WHERE date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
ORDER BY date;

-- Customer purchase patterns
SELECT
    customer_id,
    order_date,
    order_amount,
    -- Order sequence for each customer
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_number,
    -- Running total per customer
    SUM(order_amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS customer_lifetime_value,
    -- Days since last order
    DATEDIFF(order_date, LAG(order_date) OVER (
        PARTITION BY customer_id ORDER BY order_date
    )) AS days_since_last_order,
    -- First and last order amounts
    FIRST_VALUE(order_amount) OVER (
        PARTITION BY customer_id ORDER BY order_date
    ) AS first_order_amount
FROM orders
ORDER BY customer_id, order_date;
            </div>
            
            <h3>🏢 Real-Time Project Example 3: User Engagement & Retention Analysis</h3>
            <div class="code-example">
-- User activity tracking with cohort analysis
SELECT
    user_id,
    activity_date,
    page_views,
    session_duration,
    -- User's activity rank by date
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY activity_date) AS activity_day_number,
    -- Running total of page views
    SUM(page_views) OVER (
        PARTITION BY user_id
        ORDER BY activity_date
    ) AS total_page_views,
    -- 7-day rolling average engagement
    AVG(session_duration) OVER (
        PARTITION BY user_id
        ORDER BY activity_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS avg_session_7days,
    -- Days between sessions
    DATEDIFF(
        activity_date,
        LAG(activity_date) OVER (PARTITION BY user_id ORDER BY activity_date)
    ) AS days_since_last_activity,
    -- Identify returning users
    CASE
        WHEN ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY activity_date) = 1 THEN 'New'
        WHEN DATEDIFF(
            activity_date,
            LAG(activity_date) OVER (PARTITION BY user_id ORDER BY activity_date)
        ) <= 7 THEN 'Active'
        ELSE 'Returning'
    END AS user_status
FROM user_activity
WHERE activity_date >= DATE_SUB(CURRENT_DATE, INTERVAL 90 DAY)
ORDER BY user_id, activity_date;
            </div>
        `
    }
};

// Made with Bob
