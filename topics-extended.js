// Extended topics with ACID, Normalization, and Triggers
const extendedTopics = {
    acid: {
        title: "ACID Properties",
        content: `
            <h2>🔐 ACID Properties - Complete Guide</h2>
            <p>ACID is a set of properties that guarantee database transactions are processed reliably. Let's understand each property from scratch!</p>
            
            <div class="info-box">
                <strong>What is ACID?</strong><br>
                ACID stands for Atomicity, Consistency, Isolation, and Durability. These are the four key properties that ensure database reliability and data integrity.
            </div>
            
            <h3>1. ⚛️ Atomicity (All or Nothing)</h3>
            <p><strong>Simple Explanation:</strong> A transaction is treated as a single unit - either everything happens or nothing happens.</p>
            
            <div class="diagram">
                <div class="diagram-title">Atomicity Example</div>
                <div style="text-align: left; max-width: 600px; margin: 0 auto;">
                    <p><strong>Scenario:</strong> Transferring $100 from Account A to Account B</p>
                    <p>✅ <strong>With Atomicity:</strong></p>
                    <ul>
                        <li>Step 1: Deduct $100 from Account A ✓</li>
                        <li>Step 2: Add $100 to Account B ✓</li>
                        <li>Result: Both steps complete successfully</li>
                    </ul>
                    <p>❌ <strong>If Step 2 Fails:</strong></p>
                    <ul>
                        <li>Step 1 is automatically ROLLED BACK</li>
                        <li>Account A keeps its $100</li>
                        <li>No money is lost!</li>
                    </ul>
                </div>
            </div>
            
            <div class="code-example">
-- Example: Bank Transfer with Atomicity
BEGIN TRANSACTION;

-- Step 1: Deduct money
UPDATE accounts 
SET balance = balance - 100 
WHERE account_id = 'A123';

-- Step 2: Add money
UPDATE accounts 
SET balance = balance + 100 
WHERE account_id = 'B456';

-- If both succeed, save changes
COMMIT;

-- If any step fails, undo everything
-- ROLLBACK; (happens automatically on error)
            </div>
            
            <div class="success-box">
                <strong>✅ Real-World Analogy:</strong> Think of atomicity like a light switch - it's either ON or OFF, never in between. A transaction is either fully completed or fully undone.
            </div>
            
            <h3>2. ✔️ Consistency (Valid State Always)</h3>
            <p><strong>Simple Explanation:</strong> The database must always be in a valid state before and after a transaction.</p>
            
            <p><strong>What does "valid state" mean?</strong></p>
            <ul>
                <li>All rules (constraints) are followed</li>
                <li>Data relationships are maintained</li>
                <li>No data corruption occurs</li>
            </ul>
            
            <div class="code-example">
-- Example: Consistency with Constraints
CREATE TABLE accounts (
    account_id VARCHAR(10) PRIMARY KEY,
    balance DECIMAL(10,2) CHECK (balance >= 0)
);

-- This transaction will FAIL (maintains consistency)
BEGIN TRANSACTION;
UPDATE accounts 
SET balance = balance - 1000
WHERE account_id = 'A123' AND balance = 500;
COMMIT;

-- Database remains in valid state (balance stays 500)
            </div>
            
            <h3>3. 🔒 Isolation (Transactions Don't Interfere)</h3>
            <p><strong>Simple Explanation:</strong> Multiple transactions happening at the same time don't mess with each other.</p>
            
            <div class="code-example">
-- Isolation Levels
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
            </div>
            
            <h3>4. 💾 Durability (Changes are Permanent)</h3>
            <p><strong>Simple Explanation:</strong> Once a transaction is committed, the changes are permanent - even if the system crashes!</p>
            
            <div class="success-box">
                <strong>✅ Real-World Analogy:</strong> Durability is like writing with permanent marker instead of pencil. Once you commit (write), it can't be erased by accidents.
            </div>
        `
    },
    
    normalization: {
        title: "Normalization",
        content: `
            <h2>📐 Database Normalization - From Zero to Hero</h2>
            <p>Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.</p>
            
            <h3>🎯 The Problem: Unnormalized Data</h3>
            <div class="warning-box">
                <strong>⚠️ Problems with unnormalized data:</strong>
                <ul>
                    <li>Multiple values in single cell</li>
                    <li>Duplicate data everywhere</li>
                    <li>Hard to query efficiently</li>
                    <li>Update anomalies</li>
                </ul>
            </div>
            
            <h3>📊 First Normal Form (1NF)</h3>
            <p><strong>Rule:</strong> Each cell must contain only ONE value (atomic values). No repeating groups!</p>
            
            <div class="code-example">
-- Before 1NF (BAD)
CREATE TABLE students_bad (
    student_id INT,
    name VARCHAR(100),
    courses VARCHAR(200)  -- "Math, Science, English"
);

-- After 1NF (GOOD)
CREATE TABLE students (
    student_id INT,
    name VARCHAR(100)
);

CREATE TABLE student_courses (
    student_id INT,
    course_name VARCHAR(50)
);
            </div>
            
            <h3>📊 Second Normal Form (2NF)</h3>
            <p><strong>Rule:</strong> Must be in 1NF + No partial dependencies</p>
            <p>All non-key columns must depend on the ENTIRE primary key.</p>
            
            <div class="code-example">
-- After 2NF
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    instructor VARCHAR(100)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id)
);
            </div>
            
            <h3>📊 Third Normal Form (3NF)</h3>
            <p><strong>Rule:</strong> Must be in 2NF + No transitive dependencies</p>
            <p>Non-key columns should not depend on other non-key columns.</p>
            
            <div class="code-example">
-- After 3NF (BEST)
CREATE TABLE instructors (
    instructor_id INT PRIMARY KEY,
    instructor_name VARCHAR(100),
    department VARCHAR(50)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    instructor_id INT,
    FOREIGN KEY (instructor_id) REFERENCES instructors(instructor_id)
);
            </div>
            
            <div class="success-box">
                <strong>✅ Benefits of Normalization:</strong>
                <ul>
                    <li>No duplicate data</li>
                    <li>Easy to maintain</li>
                    <li>Data integrity ensured</li>
                    <li>Efficient storage</li>
                </ul>
            </div>
        `
    },
    
    triggers: {
        title: "Triggers",
        content: `
            <h2>⚡ SQL Triggers - Complete Beginner's Guide</h2>
            <p>A trigger is like an automatic alarm that executes code when something happens in your database.</p>
            
            <div class="info-box">
                <strong>What is a Trigger?</strong><br>
                A trigger is a special stored procedure that automatically runs when a specific event occurs (INSERT, UPDATE, or DELETE).
            </div>
            
            <h3>🎯 Why Use Triggers?</h3>
            <ul>
                <li><strong>Automation:</strong> Automatically update related data</li>
                <li><strong>Auditing:</strong> Track who changed what and when</li>
                <li><strong>Validation:</strong> Enforce complex business rules</li>
                <li><strong>Logging:</strong> Keep history of changes</li>
            </ul>
            
            <h3>🔥 Example 1: Automatic Timestamp</h3>
            <div class="code-example">
-- Create BEFORE UPDATE trigger
CREATE TRIGGER before_employee_update
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END;

-- Now when you update:
UPDATE employees 
SET salary = 60000 
WHERE id = 1;
-- The updated_at field is automatically set!
            </div>
            
            <h3>🔥 Example 2: Audit Log</h3>
            <div class="code-example">
-- Create audit table
CREATE TABLE salary_audit (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    old_salary DECIMAL(10,2),
    new_salary DECIMAL(10,2),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create AFTER UPDATE trigger
CREATE TRIGGER after_salary_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    IF OLD.salary != NEW.salary THEN
        INSERT INTO salary_audit (employee_id, old_salary, new_salary)
        VALUES (NEW.id, OLD.salary, NEW.salary);
    END IF;
END;
            </div>
            
            <div class="info-box">
                <strong>💡 Key Points:</strong><br>
                • <strong>OLD</strong> = values before the change<br>
                • <strong>NEW</strong> = values after the change<br>
                • <strong>USER()</strong> = current database user
            </div>
            
            <h3>🔥 Example 3: Validation</h3>
            <div class="code-example">
-- Prevent salary below minimum wage
CREATE TRIGGER validate_salary
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    IF NEW.salary < 15000 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Salary too low!';
    END IF;
END;
            </div>
            
            <h3>🔥 Example 4: Automatic Inventory Update</h3>
            <div class="code-example">
-- When order placed, reduce inventory
CREATE TRIGGER update_inventory
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    UPDATE products
    SET stock_quantity = stock_quantity - NEW.quantity
    WHERE product_id = NEW.product_id;
END;
            </div>
            
            <h3>📋 Trigger Syntax Template</h3>
            <div class="code-example">
CREATE TRIGGER trigger_name
{BEFORE | AFTER} {INSERT | UPDATE | DELETE}
ON table_name
FOR EACH ROW
BEGIN
    -- Your trigger logic here
    -- Use OLD.column_name for old values
    -- Use NEW.column_name for new values
END;
            </div>
            
            <h3>⚠️ Trigger Best Practices</h3>
            <div class="warning-box">
                <strong>DO:</strong>
                <ul>
                    <li>Keep triggers simple and fast</li>
                    <li>Document what each trigger does</li>
                    <li>Use for auditing and logging</li>
                </ul>
                <strong>DON'T:</strong>
                <ul>
                    <li>Put complex business logic in triggers</li>
                    <li>Create trigger chains</li>
                    <li>Forget that triggers add overhead</li>
                </ul>
            </div>
            
            <h3>🔍 Managing Triggers</h3>
            <div class="code-example">
-- View all triggers
SHOW TRIGGERS;

-- Drop a trigger
DROP TRIGGER IF EXISTS trigger_name;
            </div>
        `
    }
};

// Merge with existing topics
Object.assign(topics, extendedTopics);

// Made with Bob
