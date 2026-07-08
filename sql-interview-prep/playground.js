// Sample database tables
const sampleTables = {
    employees: {
        name: 'employees',
        columns: ['id', 'name', 'email', 'department', 'salary', 'hire_date'],
        data: [
            { id: 1, name: 'John Doe', email: 'john@company.com', department: 'IT', salary: 75000, hire_date: '2020-01-15' },
            { id: 2, name: 'Jane Smith', email: 'jane@company.com', department: 'HR', salary: 65000, hire_date: '2019-03-20' },
            { id: 3, name: 'Bob Johnson', email: 'bob@company.com', department: 'IT', salary: 80000, hire_date: '2018-07-10' },
            { id: 4, name: 'Alice Williams', email: 'alice@company.com', department: 'Sales', salary: 70000, hire_date: '2021-02-01' },
            { id: 5, name: 'Charlie Brown', email: 'charlie@company.com', department: 'IT', salary: 85000, hire_date: '2017-11-05' },
            { id: 6, name: 'Diana Prince', email: 'diana@company.com', department: 'Marketing', salary: 72000, hire_date: '2020-06-15' },
            { id: 7, name: 'Eve Davis', email: 'eve@company.com', department: 'HR', salary: 68000, hire_date: '2019-09-01' },
            { id: 8, name: 'Frank Miller', email: 'frank@company.com', department: 'Sales', salary: 78000, hire_date: '2020-04-20' }
        ]
    },
    orders: {
        name: 'orders',
        columns: ['order_id', 'customer_id', 'product', 'quantity', 'price', 'order_date'],
        data: [
            { order_id: 1, customer_id: 101, product: 'Laptop', quantity: 2, price: 1200, order_date: '2024-01-15' },
            { order_id: 2, customer_id: 102, product: 'Mouse', quantity: 5, price: 25, order_date: '2024-01-16' },
            { order_id: 3, customer_id: 101, product: 'Keyboard', quantity: 2, price: 75, order_date: '2024-01-17' },
            { order_id: 4, customer_id: 103, product: 'Monitor', quantity: 1, price: 350, order_date: '2024-01-18' },
            { order_id: 5, customer_id: 102, product: 'Laptop', quantity: 1, price: 1200, order_date: '2024-01-19' },
            { order_id: 6, customer_id: 104, product: 'Headphones', quantity: 3, price: 80, order_date: '2024-01-20' }
        ]
    },
    customers: {
        name: 'customers',
        columns: ['customer_id', 'name', 'email', 'city', 'country'],
        data: [
            { customer_id: 101, name: 'Tech Corp', email: 'contact@techcorp.com', city: 'New York', country: 'USA' },
            { customer_id: 102, name: 'Global Solutions', email: 'info@global.com', city: 'London', country: 'UK' },
            { customer_id: 103, name: 'Innovation Ltd', email: 'hello@innovation.com', city: 'Tokyo', country: 'Japan' },
            { customer_id: 104, name: 'Digital Systems', email: 'support@digital.com', city: 'Berlin', country: 'Germany' }
        ]
    }
};

// Simple SQL parser and executor
class SimpleSQLExecutor {
    constructor(tables) {
        this.tables = tables;
    }

    execute(query) {
        try {
            query = query.trim().replace(/;$/, '');
            const upperQuery = query.toUpperCase();

            if (upperQuery.startsWith('SELECT')) {
                return this.executeSelect(query);
            } else if (upperQuery.startsWith('INSERT')) {
                return { success: false, error: 'INSERT operations are not supported in this playground (read-only mode)' };
            } else if (upperQuery.startsWith('UPDATE')) {
                return { success: false, error: 'UPDATE operations are not supported in this playground (read-only mode)' };
            } else if (upperQuery.startsWith('DELETE')) {
                return { success: false, error: 'DELETE operations are not supported in this playground (read-only mode)' };
            } else {
                return { success: false, error: 'Only SELECT queries are supported in this playground' };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    executeSelect(query) {
        try {
            // Extract table name
            const fromMatch = query.match(/FROM\s+(\w+)/i);
            if (!fromMatch) {
                return { success: false, error: 'Could not find FROM clause' };
            }

            const tableName = fromMatch[1].toLowerCase();
            if (!this.tables[tableName]) {
                return { success: false, error: `Table '${tableName}' not found` };
            }

            let data = [...this.tables[tableName].data];

            // Handle WHERE clause
            const whereMatch = query.match(/WHERE\s+(.+?)(?:ORDER BY|GROUP BY|LIMIT|$)/i);
            if (whereMatch) {
                const whereClause = whereMatch[1].trim();
                data = this.applyWhere(data, whereClause);
            }

            // Handle ORDER BY
            const orderMatch = query.match(/ORDER BY\s+(\w+)(?:\s+(ASC|DESC))?/i);
            if (orderMatch) {
                const column = orderMatch[1];
                const direction = orderMatch[2]?.toUpperCase() || 'ASC';
                data = this.applyOrderBy(data, column, direction);
            }

            // Handle LIMIT
            const limitMatch = query.match(/LIMIT\s+(\d+)/i);
            if (limitMatch) {
                const limit = parseInt(limitMatch[1]);
                data = data.slice(0, limit);
            }

            // Handle column selection
            const selectMatch = query.match(/SELECT\s+(.+?)\s+FROM/i);
            if (selectMatch) {
                const columns = selectMatch[1].trim();
                if (columns !== '*') {
                    data = this.selectColumns(data, columns);
                }
            }

            return {
                success: true,
                data: data,
                rowCount: data.length
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    applyWhere(data, whereClause) {
        return data.filter(row => {
            // Simple WHERE clause parsing
            // Supports: column = value, column > value, column < value, column LIKE 'pattern'
            
            // Handle LIKE
            const likeMatch = whereClause.match(/(\w+)\s+LIKE\s+['"](.+?)['"]/i);
            if (likeMatch) {
                const column = likeMatch[1];
                const pattern = likeMatch[2].replace(/%/g, '.*');
                const regex = new RegExp('^' + pattern + '$', 'i');
                return regex.test(String(row[column]));
            }

            // Handle comparison operators
            const compMatch = whereClause.match(/(\w+)\s*(=|>|<|>=|<=|!=|<>)\s*['"]?(.+?)['"]?$/i);
            if (compMatch) {
                const column = compMatch[1];
                const operator = compMatch[2];
                let value = compMatch[3].replace(/['"]/g, '');
                
                // Try to convert to number if possible
                const numValue = parseFloat(value);
                if (!isNaN(numValue)) {
                    value = numValue;
                }

                const rowValue = row[column];

                switch (operator) {
                    case '=': return rowValue == value;
                    case '>': return rowValue > value;
                    case '<': return rowValue < value;
                    case '>=': return rowValue >= value;
                    case '<=': return rowValue <= value;
                    case '!=':
                    case '<>': return rowValue != value;
                    default: return true;
                }
            }

            return true;
        });
    }

    applyOrderBy(data, column, direction) {
        return data.sort((a, b) => {
            const aVal = a[column];
            const bVal = b[column];
            
            if (aVal < bVal) return direction === 'ASC' ? -1 : 1;
            if (aVal > bVal) return direction === 'ASC' ? 1 : -1;
            return 0;
        });
    }

    selectColumns(data, columnsStr) {
        const columns = columnsStr.split(',').map(c => c.trim());
        return data.map(row => {
            const newRow = {};
            columns.forEach(col => {
                // Handle aliases (column AS alias)
                const aliasMatch = col.match(/(\w+)\s+AS\s+(\w+)/i);
                if (aliasMatch) {
                    newRow[aliasMatch[2]] = row[aliasMatch[1]];
                } else {
                    newRow[col] = row[col];
                }
            });
            return newRow;
        });
    }
}

// Initialize playground
function initPlayground() {
    const executor = new SimpleSQLExecutor(sampleTables);
    const runBtn = document.getElementById('run-query-btn');
    const clearBtn = document.getElementById('clear-query-btn');
    const editor = document.getElementById('sql-editor');
    const resultsDiv = document.getElementById('query-results');
    const sampleTablesSelect = document.getElementById('sample-tables');
    const sampleDataDisplay = document.getElementById('sample-data-display');

    // Run query
    runBtn?.addEventListener('click', () => {
        const query = editor.value.trim();
        if (!query) {
            resultsDiv.innerHTML = '<div class="error-message">Please enter a SQL query</div>';
            return;
        }

        const result = executor.execute(query);
        displayResults(result, resultsDiv);
    });

    // Clear editor
    clearBtn?.addEventListener('click', () => {
        editor.value = '';
        resultsDiv.innerHTML = '<p style="color: #666;">Results will appear here...</p>';
    });

    // Load sample table
    sampleTablesSelect?.addEventListener('change', (e) => {
        const tableName = e.target.value;
        if (tableName && sampleTables[tableName]) {
            displaySampleTable(sampleTables[tableName], sampleDataDisplay);
            editor.value = `SELECT * FROM ${tableName};`;
        }
    });

    // Initial message
    if (resultsDiv) {
        resultsDiv.innerHTML = '<p style="color: #666;">Results will appear here...</p>';
    }
}

function displayResults(result, container) {
    if (!result.success) {
        container.innerHTML = `<div class="error-message">❌ Error: ${result.error}</div>`;
        return;
    }

    if (result.data.length === 0) {
        container.innerHTML = '<div class="success-message">✅ Query executed successfully. No rows returned.</div>';
        return;
    }

    const columns = Object.keys(result.data[0]);
    let html = `<div class="success-message">✅ Query executed successfully. ${result.rowCount} row(s) returned.</div>`;
    html += '<table class="result-table"><thead><tr>';
    
    columns.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';

    result.data.forEach(row => {
        html += '<tr>';
        columns.forEach(col => {
            html += `<td>${row[col] !== null && row[col] !== undefined ? row[col] : 'NULL'}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function displaySampleTable(table, container) {
    let html = `<h4>${table.name} Table</h4>`;
    html += '<table class="result-table"><thead><tr>';
    
    table.columns.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';

    table.data.forEach(row => {
        html += '<tr>';
        table.columns.forEach(col => {
            html += `<td>${row[col]}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayground);
} else {
    initPlayground();
}

// Made with Bob
