const DOM = {
    selectCategory: null,
    loader: null,
    statisticsContent: null,
    chartsContainer: null
}

function init() {
    DOM.statisticsContent = document.getElementById("stats")
    DOM.selectCategory = document.getElementById("categoriesSelect")
    DOM.loader = document.getElementById("loader")
    DOM.chartsContainer = document.getElementById("chartsContainer")
    DOM.selectCategory.addEventListener("change", function () {
        if (this.value === "noValue") return;
        showProducts(this.value)
    })
    showCategories()
}

async function showCategories() {
    try {
        const result = await getCategoriesApi()
        drawCategories([{ slug: "all", name: "All" }, ...result])
    }
    catch {
        alert("Something went wrong!")
    }
}

async function getCategoriesApi() {
    const result = await fetch(`https://dummyjson.com/products/categories`)
    const data = await result.json()
    return data
}

function drawCategories(data) {
    if (!Array.isArray(data)) return;
    data.forEach((currentCategory) => {
        const optionElement = `<option value='${currentCategory.slug}'> ${currentCategory.name} </option>`
        DOM.selectCategory.innerHTML += optionElement
    })
}

async function showProducts(categoryId) {
    try {
        showLoader()
        const fnName = categoryId === "all" ? getAllProducts : getProductsByCategoryApi
        const result = await fnName(categoryId)
        const avgPrice = getAverageByAttribute(result, "price")
        const avgRating = getAverageByAttribute(result, "rating")
        const brandStats = getCountersByBrand(result)
        const returnPolicyStats = getCountersByAttribute(result, "returnPolicy")
        const shippingStats = getCountersByAttribute(result, "shippingInformation")
        drawStatistics(avgPrice, avgRating, brandStats, returnPolicyStats, shippingStats)
        draw(result)
        drawAllCharts([
            { title: "Brand Chart", stats: brandStats },
            { title: "Return Policy Chart", stats: returnPolicyStats },
            { title: "Shipping Information Chart", stats: shippingStats }
        ])
    }
    catch {
        alert("Something went wrong!")
    }
    finally {
        hideLoader()
    }
}

async function getProductsByCategoryApi(categoryId) {
    const result = await fetch(`https://dummyjson.com/products/category/${categoryId}`)
    const data = await result.json()
    return data.products
}

async function getAllProducts() {
    const result = await fetch(`https://dummyjson.com/products`)
    const data = await result.json()
    return data.products
}

function draw(products) {
    const titles = products.map(p => `<h2>${p.title}</h2>`)
    document.querySelector("#content").innerHTML = titles.join("")
}

function showLoader() {
    DOM.loader.style.display = "flex"
}

function hideLoader() {
    DOM.loader.style.display = "none"
}

function drawStatistics(avg, averageR, statsByBrand, returnPoliciesStats, shippingInfoStats) {
    DOM.statisticsContent.innerHTML = `<h1>Statistics</h1>
    <h2>Average Price: ${avg}</h2>
    <h2>Average Rating: ${averageR}</h2>`

    if (Object.keys(statsByBrand).length) {
        DOM.statisticsContent.innerHTML += `<h2>Brand Statistics</h2>`
        for (key in statsByBrand) {
            DOM.statisticsContent.innerHTML += `<h3>${key}: ${statsByBrand[key]}</h3>`
        }
    }

    if (Object.keys(returnPoliciesStats).length) {
        DOM.statisticsContent.innerHTML += `<h2>Return Policy Statistics</h2>`
        for (const key in returnPoliciesStats) {
            DOM.statisticsContent.innerHTML += `<h3>${key}: ${returnPoliciesStats[key]}</h3>`
        }
    }

    if (Object.keys(shippingInfoStats).length) {
        DOM.statisticsContent.innerHTML += `<h2>Shipping Information Statistics</h2>`
        for (const key in shippingInfoStats) {
            DOM.statisticsContent.innerHTML += `<h3>${key}: ${shippingInfoStats[key]}</h3>`
        }
    }
}

function getAverageByAttribute(arr, attr) {
    if (!Array.isArray(arr)) return;
    let sum = 0;
    arr.forEach(p => {
        sum += p[attr]
    })
    return Math.ceil(sum / arr.length)
}

function getCountersByBrand(arr) {
    if (!Array.isArray(arr)) return;
    let productBrand = {}
    arr.forEach(p => {
        if (p.brand) {
            productBrand[p.brand] = (productBrand[p.brand] || 0) + 1
        }
    })
    return productBrand;
}

function getCountersByAttribute(arr, attr) {
    if (!Array.isArray(arr)) return;
    let counters = {};
    arr.forEach(item => {
        const value = item[attr];
        if (value) {
            counters[value] = (counters[value] || 0) + 1;
        }
    });
    return counters;
}

function drawAllCharts(chartsData) {
    DOM.chartsContainer.innerHTML = "";
    chartsData.forEach(({ title, stats }) => {
        const container = document.createElement("div");
        const heading = document.createElement("h2");
        heading.innerText = title;
        const chart = document.createElement("div");
        chart.className = "bar-chart";

        const max = Math.max(...Object.values(stats));
        for (const key in stats) {
            const count = stats[key];

            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";
            wrapper.style.alignItems = "center";
            wrapper.style.width = "50px"; // קו קריטי: הרוחב של כל עמודה

            const bar = document.createElement("div");
            bar.className = "bar";
            bar.style.height = `${(count / max) * 100}%`;
            bar.title = `${key}: ${count}`;
            bar.innerText = count;

            const label = document.createElement("div");
            label.style.marginTop = "5px";
            label.style.fontSize = "10px";
            label.style.textAlign = "center";
            label.style.wordBreak = "break-word";
            label.innerText = key;

            wrapper.appendChild(bar);
            wrapper.appendChild(label);
            chart.appendChild(wrapper);
        }

        container.appendChild(heading);
        container.appendChild(chart);
        DOM.chartsContainer.appendChild(container);
    });
}




init()
