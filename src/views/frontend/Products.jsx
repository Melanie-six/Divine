import '../../assets/all.css';

function Products() {
    return (<>
    <div className="container theme-dark p-1">
        <div className="row">
            <div className="sidebar col-lg-3">
                <ul>
                    <li className="heading-primary">全部產品</li>
                    <li className="text-description">冷藏蛋糕</li>
                    <li className="text-description">常溫蛋糕</li>
                    <li className="text-description">泡芙</li>
                </ul>
            </div>
            <div className="main col-lg-9 row">
                <div className="productcard col-3">
                    <img src="https://media.gettyimages.com/id/2154012568/fr/photo/chouquettes-with-sugar-pastries.jpg?s=612x612&w=0&k=20&c=YWqnkX_efIHl7jVNwVathcQe5Rtl_DTcX_eI4WzzVgE=" alt="product title" />
                    <p className="text-description h3">product title</p>
                    <p className="text-description">product price</p>
                </div>
                <div className="productcard col-3">
                    <img src="https://media.gettyimages.com/id/2154012568/fr/photo/chouquettes-with-sugar-pastries.jpg?s=612x612&w=0&k=20&c=YWqnkX_efIHl7jVNwVathcQe5Rtl_DTcX_eI4WzzVgE=" alt="product title" />
                    <p>product title</p>
                    <p>product price</p>
                </div>
                <div className="productcard col-3">
                    <img src="https://media.gettyimages.com/id/2154012568/fr/photo/chouquettes-with-sugar-pastries.jpg?s=612x612&w=0&k=20&c=YWqnkX_efIHl7jVNwVathcQe5Rtl_DTcX_eI4WzzVgE=" alt="product title" />
                    <p>product title</p>
                    <p>product price</p>
                </div>
            </div>
        </div>
    </div>
    </>
    )
};
export default Products;