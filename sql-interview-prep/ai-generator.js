// AI SQL Query Generator
// This simulates an AI that generates SQL queries from natural language

const queryPatterns = {
    // SELECT patterns
    'get all|select all|show all|find all': {
        template: 'SELECT * FROM {table};',
        explanation: 'This query retrieves all columns and all rows from the {table} table.'
    },
    'get|select|show|find': {
        template: 'SELECT {columns} FROM {table};',
        explanation: 'This query retrieves specific columns from the {table} table.'
    },
    
    // WHERE patterns
    'where|with|having': {
        template: 'SELECT * FROM {table} WHERE {condition};',
        explanation: 'This query filters rows based on the specified condition.'
    },
    
    // Comparison patterns
    'greater than|more than|above': {
        operator: '>',
        explanation: 'Uses the greater than (>) operator to filter values.'
    },
    'less than|below|under': {
        operator: '<',
        explanation: 'Uses the less than (<) operator to filter values.'
    },
    'equal to|equals|is': {
        operator: '=',
        explanation: 'Uses the equals (=) operator to match exact values.'
    },
    
    // Aggregate patterns
    'count|how many': {
        template: 'SELECT COUNT(*) AS count FROM {table};',
        explanation: 'This query counts the total number of rows in the {table} table.'
    },
    'average|avg': {
        template: 'SELECT AVG({column}) AS average FROM {table};',
        explanation: 'This query calculates the average value of the {column} column.'
    },
    'sum|total': {
        template: 'SELECT SUM({column}) AS total FROM {table};',
        explanation: 'This query calculates the sum of all values in the {column} column.'
    },
    'maximum|max|highest|top': {
        template: 'SELECT MAX({column}) AS maximum FROM {table};',
        explanation: 'This query finds the maximum value in the {column} column.'
    },
    'minimum|min|lowest': {
        template: 'SELECT MIN({column}) AS minimum FROM {table};',
        explanation: 'This query finds the minimum value in the {column} column.'
    },
    
    // JOIN patterns
    'join|combine|merge': {
        template: 'SELECT * FROM {table1} JOIN {table2} ON {table1}.{key} = {table2}.{key};',
        explanation: 'This query joins two tables based on a common key column.'
    },
    
    // GROUP BY patterns
    'group by|grouped by|by': {
        template: 'SELECT {column}, COUNT(*) AS count FROM {table} GROUP BY {column};',
        explanation: 'This query groups rows by {column} and counts items in each group.'
    },
    
    // ORDER BY patterns
    'sort|order|arrange': {
        template: 'SELECT * FROM {table} ORDER BY {column} {direction};',
        explanation: 'This query sorts the results by the {column} column.'
    },
    
    // LIMIT patterns
    'top|first|limit': {
        template: 'SELECT * FROM {table} LIMIT {number};',
        explanation: 'This query limits the results to the first {number} rows.'
    }
};

class AIQueryGenerator {
    constructor() {
        this.tables = ['employees', 'orders', 'customers', 'products', 'departments'];
        this.columns = {
            employees: ['id', 'name', 'email', 'department', 'salary', 'hire_date'],
            orders: ['order_id', 'customer_id', 'product', 'quantity', 'price', 'order_date'],
            customers: ['customer_id', 'name', 'email', 'city', 'country'],
            products: ['product_id', 'name', 'price', 'category', 'stock'],
            departments: ['dept_id', 'dept_name', 'manager_id']
        };
    }

    generate(prompt) {
        prompt = prompt.toLowerCase().trim();
        
        // Detect table
        const table = this.detectTable(prompt);
        
        // Detect columns
        const columns = this.detectColumns(prompt, table);
        
        // Detect query type and generate
        if (prompt.includes('join') || prompt.includes('combine')) {
            return this.generateJoinQuery(prompt, table);
        } else if (prompt.includes('count') || prompt.includes('how many')) {
            return this.generateCountQuery(prompt, table);
        } else if (prompt.includes('average') || prompt.includes('avg')) {
            return this.generateAverageQuery(prompt, table, columns);
        } else if (prompt.includes('sum') || prompt.includes('total')) {
            return this.generateSumQuery(prompt, table, columns);
        } else if (prompt.includes('max') || prompt.includes('highest') || prompt.includes('top')) {
            return this.generateMaxQuery(prompt, table, columns);
        } else if (prompt.includes('min') || prompt.includes('lowest')) {
            return this.generateMinQuery(prompt, table, columns);
        } else if (prompt.includes('group by') || prompt.includes('by')) {
            return this.generateGroupByQuery(prompt, table, columns);
        } else if (this.hasCondition(prompt)) {
            return this.generateWhereQuery(prompt, table, columns);
        } else {
            return this.generateSelectQuery(prompt, table, columns);
        }
    }

    detectTable(prompt) {
        for (const table of this.tables) {
            if (prompt.includes(table) || prompt.includes(table.slice(0, -1))) {
                return table;
            }
        }
        return 'employees'; // default
    }

    detectColumns(prompt, table) {
        const detectedColumns = [];
        const tableColumns = this.columns[table] || [];
        
        for (const col of tableColumns) {
            if (prompt.includes(col)) {
                detectedColumns.push(col);
            }
        }
        
        return detectedColumns.length > 0 ? detectedColumns : ['*'];
    }

    hasCondition(prompt) {
        const conditionKeywords = ['where', 'with', 'greater', 'less', 'more', 'than', 'equal', 'from', 'in'];
        return conditionKeywords.some(keyword => prompt.includes(keyword));
    }

    generateSelectQuery(prompt, table, columns) {
        const columnStr = columns[0] === '*' ? '*' : columns.join(', ');
        const query = `SELECT ${columnStr}\nFROM ${table};`;
        const explanation = `This query retrieves ${columns[0] === '*' ? 'all columns' : 'the ' + columns.join(', ') + ' column(s)'} from the ${table} table.`;
        
        return { query, explanation };
    }

    generateWhereQuery(prompt, table, columns) {
        const columnStr = columns[0] === '*' ? '*' : columns.join(', ');
        let condition = '';
        let explanation = '';

        // Detect numeric comparisons
        const numberMatch = prompt.match(/(\d+)/);
        const number = numberMatch ? numberMatch[1] : '50000';

        if (prompt.includes('greater') || prompt.includes('more') || prompt.includes('above')) {
            const col = columns.find(c => c.includes('salary') || c.includes('price') || c.includes('quantity')) || 'salary';
            condition = `${col} > ${number}`;
            explanation = `This query retrieves records where ${col} is greater than ${number}.`;
        } else if (prompt.includes('less') || prompt.includes('below') || prompt.includes('under')) {
            const col = columns.find(c => c.includes('salary') || c.includes('price') || c.includes('quantity')) || 'salary';
            condition = `${col} < ${number}`;
            explanation = `This query retrieves records where ${col} is less than ${number}.`;
        } else if (prompt.includes('equal') || prompt.includes('is')) {
            // Detect string values
            const stringMatch = prompt.match(/['"]([^'"]+)['"]/);
            if (stringMatch) {
                const value = stringMatch[1];
                const col = columns.find(c => c.includes('department') || c.includes('city') || c.includes('name')) || 'department';
                condition = `${col} = '${value}'`;
                explanation = `This query retrieves records where ${col} equals '${value}'.`;
            } else {
                condition = `id = ${number}`;
                explanation = `This query retrieves records where id equals ${number}.`;
            }
        } else {
            // Default condition
            const col = columns.find(c => c.includes('department') || c.includes('city')) || 'department';
            condition = `${col} = 'IT'`;
            explanation = `This query retrieves records where ${col} equals 'IT'.`;
        }

        const query = `SELECT ${columnStr}\nFROM ${table}\nWHERE ${condition};`;
        return { query, explanation };
    }

    generateCountQuery(prompt, table) {
        let query = '';
        let explanation = '';

        if (prompt.includes('by') || prompt.includes('group')) {
            const col = prompt.includes('department') ? 'department' : 
                       prompt.includes('city') ? 'city' : 
                       prompt.includes('country') ? 'country' : 'department';
            query = `SELECT ${col}, COUNT(*) AS count\nFROM ${table}\nGROUP BY ${col};`;
            explanation = `This query counts the number of records in each ${col} and groups them accordingly.`;
        } else {
            query = `SELECT COUNT(*) AS total_count\nFROM ${table};`;
            explanation = `This query counts the total number of records in the ${table} table.`;
        }

        return { query, explanation };
    }

    generateAverageQuery(prompt, table, columns) {
        const col = columns.find(c => c.includes('salary') || c.includes('price')) || 'salary';
        const query = `SELECT AVG(${col}) AS average_${col}\nFROM ${table};`;
        const explanation = `This query calculates the average ${col} from the ${table} table.`;
        return { query, explanation };
    }

    generateSumQuery(prompt, table, columns) {
        const col = columns.find(c => c.includes('salary') || c.includes('price') || c.includes('quantity')) || 'salary';
        const query = `SELECT SUM(${col}) AS total_${col}\nFROM ${table};`;
        const explanation = `This query calculates the sum of all ${col} values in the ${table} table.`;
        return { query, explanation };
    }

    generateMaxQuery(prompt, table, columns) {
        const col = columns.find(c => c.includes('salary') || c.includes('price')) || 'salary';
        
        if (prompt.includes('top') && prompt.match(/\d+/)) {
            const number = prompt.match(/\d+/)[0];
            const query = `SELECT *\nFROM ${table}\nORDER BY ${col} DESC\nLIMIT ${number};`;
            const explanation = `This query retrieves the top ${number} records with the highest ${col} from the ${table} table.`;
            return { query, explanation };
        } else {
            const query = `SELECT MAX(${col}) AS max_${col}\nFROM ${table};`;
            const explanation = `This query finds the maximum ${col} value in the ${table} table.`;
            return { query, explanation };
        }
    }

    generateMinQuery(prompt, table, columns) {
        const col = columns.find(c => c.includes('salary') || c.includes('price')) || 'salary';
        const query = `SELECT MIN(${col}) AS min_${col}\nFROM ${table};`;
        const explanation = `This query finds the minimum ${col} value in the ${table} table.`;
        return { query, explanation };
    }

    generateGroupByQuery(prompt, table, columns) {
        const groupCol = columns.find(c => c.includes('department') || c.includes('city') || c.includes('category')) || 'department';
        const aggCol = columns.find(c => c.includes('salary') || c.includes('price')) || 'salary';
        
        const query = `SELECT ${groupCol}, COUNT(*) AS count, AVG(${aggCol}) AS avg_${aggCol}\nFROM ${table}\nGROUP BY ${groupCol};`;
        const explanation = `This query groups records by ${groupCol} and calculates the count and average ${aggCol} for each group.`;
        return { query, explanation };
    }

    generateJoinQuery(prompt, table) {
        let query = '';
        let explanation = '';

        if (prompt.includes('employee') && prompt.includes('department')) {
            query = `SELECT e.name, e.salary, d.dept_name\nFROM employees e\nJOIN departments d ON e.dept_id = d.dept_id;`;
            explanation = 'This query joins the employees table with the departments table to show employee names along with their department names.';
        } else if (prompt.includes('order') && prompt.includes('customer')) {
            query = `SELECT o.order_id, c.name, o.product, o.quantity\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id;`;
            explanation = 'This query joins the orders table with the customers table to show order details along with customer information.';
        } else {
            query = `SELECT *\nFROM ${table} t1\nJOIN related_table t2 ON t1.id = t2.foreign_id;`;
            explanation = `This query joins the ${table} table with a related table based on a common key.`;
        }

        return { query, explanation };
    }
}

// Initialize AI Generator
function initAIGenerator() {
    const generator = new AIQueryGenerator();
    const generateBtn = document.getElementById('generate-query-btn');
    const promptInput = document.getElementById('ai-prompt');
    const outputSection = document.getElementById('ai-output');
    const generatedQueryPre = document.getElementById('generated-query');
    const explanationP = document.getElementById('query-explanation');
    const copyBtn = document.getElementById('copy-query-btn');
    const testBtn = document.getElementById('test-query-btn');
    const exampleBtns = document.querySelectorAll('.example-prompt-btn');

    // Generate query
    generateBtn?.addEventListener('click', () => {
        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert('Please enter a description of what you want to query');
            return;
        }

        const result = generator.generate(prompt);
        generatedQueryPre.textContent = result.query;
        explanationP.textContent = result.explanation;
        outputSection.style.display = 'block';
    });

    // Copy query
    copyBtn?.addEventListener('click', () => {
        const query = generatedQueryPre.textContent;
        navigator.clipboard.writeText(query).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        });
    });

    // Test in playground
    testBtn?.addEventListener('click', () => {
        const query = generatedQueryPre.textContent;
        const sqlEditor = document.getElementById('sql-editor');
        if (sqlEditor) {
            sqlEditor.value = query;
            // Switch to playground tab
            const playgroundTab = document.querySelector('[data-tab="playground"]');
            if (playgroundTab) {
                playgroundTab.click();
            }
        }
    });

    // Example prompts
    exampleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            promptInput.value = btn.textContent;
            generateBtn.click();
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIGenerator);
} else {
    initAIGenerator();
}

// Made with Bob
