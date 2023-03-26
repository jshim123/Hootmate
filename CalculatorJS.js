document.getElementById("calculate").addEventListener("click", function() {
    const income = parseFloat(document.getElementById("income").value);
    const debts = parseFloat(document.getElementById("debts").value);
    const rentPercentage = parseFloat(document.getElementById("rentPercentage").value) / 100;

    const availableIncome = Math.max(0, income - debts);
    const minRent = availableIncome * rentPercentage * 0.8;
    const maxRent = availableIncome * rentPercentage * 1.2;

    document.getElementById("rentRange").textContent = `$${minRent.toFixed(2)} - $${maxRent.toFixed(2)}`;
    document.getElementById("results").hidden = false;
});

document.getElementById("rentPercentage").addEventListener("input", function() {
    document.getElementById("percentageValue").textContent = `${this.value}%`;
});
