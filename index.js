const form = document.getElementById('transaction-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionsList = document.getElementById('transactions');
const balanceDisplay = document.getElementById('balance');
const savingsDisplay = document.getElementById('savings');

let balance = 0;
let incomeTotal = 0;
let expenseTotal = 0;
let savingsTotal = 0;

let expenseChart = null;

// Form Submit Event
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    const description = descInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid description and amount.');
        return;
    }

    // Create new list item for transaction
    const transaction = document.createElement('li');
    transaction.textContent = `${description}: $${amount.toFixed(2)}`;
    transaction.classList.add(type);

    // Update totals
    if (type === 'income') {
        incomeTotal += amount;
        balance += amount;
    } else if (type === 'expense') {
        expenseTotal += amount;
        balance -= amount;
    } else if (type === 'savings') {
        savingsTotal += amount;
        balance -= amount; // savings reduce available balance
    }

    // Append to list
    transactionsList.appendChild(transaction);

    // Update balance & savings display
    balanceDisplay.textContent = balance.toFixed(2);
    savingsDisplay.textContent = savingsTotal.toFixed(2);

    // Update Chart
    updateChart();

    // Clear inputs
    descInput.value = '';
    amountInput.value = '';
});

// Chart.js Pie Chart Update
function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    if (expenseChart) {
        expenseChart.destroy(); // Destroy previous chart before creating new one
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expense', 'Savings'],
            datasets: [{
                data: [incomeTotal, expenseTotal, savingsTotal],
                backgroundColor: ['#2ecc71', '#e74c3c', '#2980b9'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#333',
                        font: { size: 14 }
                    }
                }
            }
        }
    });
}
