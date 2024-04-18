import { Input } from "./components/forms/Input.jsx";
import { Checkbox } from "./components/forms/Checkbox.jsx";
import { InputRange } from "./components/forms/InputRange.jsx";
import { ProductCategoryRow } from "./components/products/ProductCategoryRow.jsx";
import { ProductRow } from "./components/products/ProductRow.jsx";
import { useState } from "react"

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$2", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$4", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$8", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false) //Checkbox
  const [search, setSearch] = useState('')                      //Input
  const [priceRange, setPriceRange] = useState([0, 10]);


  const visibleProducts = PRODUCTS.filter(product => {
    //Checkbox stocked
    if (showStockedOnly && !product.stocked) {
      return false
    }

    //Input search
    if (search && !product.name.toLowerCase().includes(search.toLowerCase())) {
      console.log(search)
      return false
    }
    const productPrice = Number(product.price.slice(1))

    if (productPrice < priceRange[0]) {


      return false;
    }

    return true
  })


  return <>
    <h1>React.js : Liste de produits</h1>
    <div className="container my-3">
      <SearchBar
        search={search} onSearchChange={setSearch}
        showStockedOnly={showStockedOnly} onStockedOnlyChange={setShowStockedOnly}
        priceRange={priceRange} onPriceRangeChange={setPriceRange}

      />
      {/*<ProductTable products={PRODUCTS} />*/}
      <ProductTable products={visibleProducts} />
    </div>
  </>
}

function SearchBar({ showStockedOnly, onStockedOnlyChange, search, onSearchChange, priceRange, onPriceRangeChange }) {
  const handlePriceChange = event => {
    const value = event.target.value.split(',');
    const minPrice = Number(value[0]);
    //const maxPrice = Number(value[1]);
    //onPriceRangeChange([minPrice, maxPrice]);
    onPriceRangeChange([minPrice]);
  };
  return <div>
    <div className="mb-3">
      <Input value={search}
        onChange={onSearchChange}
        placeholder="Rechercher..." />

      <InputRange label="Filtre par prix"
        value={priceRange}
        priceRange={priceRange} handlePriceChange={handlePriceChange}
      />

      <Checkbox id="stocked"
        checked={showStockedOnly}
        onChange={onStockedOnlyChange}
        label="N'afficher que les produits en stock" />
    </div>

  </div>
}

function ProductTable({ products }) {

  const rows = []
  let lastCategory = null

  for (let product of products) {

    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
    }
    lastCategory = product.category
    rows.push(
      <ProductRow product={product} key={product.name} />
    )

  }

  return <table className="table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}
export default App
