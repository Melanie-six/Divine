import { useEffect, useRef } from 'react';
import '../../assets/about.css'

function About() {
    
    const containerRef = useRef(null);

    useEffect(() => {
        const element = containerRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) 
            {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <>
        <div className="container">
            <div className="hero">
                <div className="about-title">Divine</div>
                <div className="sub-title">Handcrafted French Pâtisserie</div>
                <div className="main-content">在精準與感性之間，誕生每一顆值得被細細品味的甜點。</div>
            </div>
            <div className="content">
                    <p className="mb-0">Divine 是一間專注於法式甜點的手工甜點品牌。</p>
                    <p>我們相信，真正令人難忘的甜點，不只是味道的堆疊，而是一種細節、時間與情感的結合。</p>

                    <p className="mb-0">在這裡，每一道甜點都像是一段精心設計的作品。</p>
                    <p className="mb-0">從麵糊的比例、烘焙的溫度，到奶油的滑順與榛果的香氣，</p>
                    <p>所有細節都被耐心調整，只為呈現最純粹而優雅的法式風味。</p>

                    <p className="text-big">因為我們相信：真正的奢華，來自於細節。</p>
            </div>
            <div className="story">
                <div className="story-left">
                    <div className="story-title">The Beginning of Divine</div>
                    <div className="story-content">
                        <p>Divine 的名字，來自於一個簡單的信念。<br /><br />
                        <span className="text-big">甜點，應該像一種祝福。</span><br />
                        它不只是餐後的點綴，而是一種能讓人停下腳步、感受片刻幸福的存在。<br /><br />
                        在法式甜點文化中，甜點是一門結合藝術與科學的工藝。<br />
                        精準的比例、嚴謹的技術，與創造力並存。<br /><br />
                        因此，Divine 希望創造的，不只是甜點，<br />
                        而是一種能讓人記住的體驗。<br /><br />
                        每一口都像是一場微小卻神聖的儀式。<br />
                        也因此，我們將品牌命名為 Divine。</p>
                    </div>
                </div>
                <div className="story-right">
                    <img className="story-img1" src="https://images.unsplash.com/photo-1710629622514-61a4fa109f25?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ5MXx8fGVufDB8fHx8fA%3D%3D" alt="泡芙" />
                    <img className="story-img2" src="https://plus.unsplash.com/premium_photo-1695028377773-e3673040f2cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFja2luZyUyMGZyZW5jaCUyMGRlc3NlcnR8ZW58MHx8MHx8fDA%3D" alt="裝飾奶油" />
                    <img className="story-img3" src="https://images.unsplash.com/photo-1708319788214-e5033c78c05b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ2MHx8fGVufDB8fHx8fA%3D%3D" alt="奶油擠花" />
                </div>
            </div>
            <div className="role" ref={containerRef}>
                <div className="en-left">
                    <div className="code-bg">
                        <div className="image-wrapper">
                            <img className="code-img" src="https://plus.unsplash.com/premium_photo-1681336999444-c6fea7f5c36f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcHV0ZXIlMjBvbiUyMHRhYmxlfGVufDB8fDB8fHww" alt="桌上筆電" />
                        </div>
                    </div>
                </div>
                <div className="maker-right">
                    <div className="maker-bg">
                        <div className="image-wrapper">
                            <img className="maker-img" src="https://plus.unsplash.com/premium_photo-1672192166785-bdf23cd39734?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwMHx8fGVufDB8fHx8fA%3D%3D" alt="桌上甜點" />
                        </div>
                    </div>
                </div>
                <div className="content-overlay">
                    <div className="content-box">
                        <div className='role-title'>A Developer Who Fell in Love with Pâtisserie</div>
                        <p className="main-content">甜點需要精準比例。程式需要精準邏輯。<br />
                            從瀏覽器畫面到烤箱溫度。兩個世界開始慢慢重疊。</p>
                    </div>
                </div>
            </div>
            <div className="role-content">
                <p>Divine 的創辦人曾是一名前端工程師。<br/><br/>

                    每天的工作，是與程式碼、邏輯與系統結構對話。<br/>
                    在螢幕前調整每一行細節，只為讓畫面呈現得更加完美。<br/><br/>

                    某一天，他發現——<br/><br/>

                    法式甜點，其實與寫程式非常相似。<br/><br/>

                    甜點需要精準比例。<br/>
                    程式需要精準邏輯。<br/><br/>

                    甜點需要反覆測試。<br/>
                    程式也需要不斷 debug。<br/><br/>

                    甜點需要美感。<br/>
                    前端設計也是如此。<br/><br/>

                    於是，從程式碼到甜點麵糊，<br/>
                    從瀏覽器畫面到烤箱溫度。<br/><br/>

                    兩個世界開始慢慢重疊。<br/><br/>

                    Divine 就在這樣的交會點誕生。</p>
            </div>
            <div className="art">
                <div className="story-title">The Art of Choux</div>
                <div className="section">
                    <div className="img-box">
                        <img className="section-img" src="https://plus.unsplash.com/premium_photo-1700612685657-3b039ec2aa11?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D" alt="泡芙麵糰" />
                    </div>
                    <div className="art-content">
                        <div className="product-slogan">
                            <p>看似簡單的泡芙，<br/>
                            其實是一門需要極高技術的甜點工藝。<br/><br/>

                            從麵糊的水分比例、麵糰的溫度、烘烤的時間，<br/>
                            到外殼的酥脆與內餡的滑順，都必須達到完美平衡。</p>
                        </div>
                    </div>
                </div>
                <div className="product-slogan">我們將泡芙的可能性延伸成多種法式經典：</div>
                <div className="section-anti">
                <div className="img-box">
                        <img className="section-img" src="https://media.istockphoto.com/id/2244918697/photo/pistachio-and-pumpkin-christmas-paris-brest-dessert.jpg?s=612x612&w=0&k=20&c=YXtVJQ0HQFk-GA6326cog7t5qaLGF-uTDstB7VA6Xxc=" alt="泡芙麵糰" />
                    </div>
                    <div className="art-content">
                        <div className="product-title">經典榛果巴黎布雷斯特</div>
                        <div className="product-slogan">圓形泡芙象徵自行車輪，內餡是濃郁榛果奶油。</div>
                    </div>
                </div>
                <div className="section">
                <div className="img-box">
                        <img className="section-img" src="https://media.istockphoto.com/id/2180189165/photo/exquisite-religieuse-eclair-pastry-with-patissiere-cream-with-chocolate-and-coffee-glaze.jpg?s=612x612&w=0&k=20&c=jJAwU2tokIxQGw1GUhiluOjC2RKOVF1HSqUaLqjQ1_E=" alt="泡芙麵糰" />
                    </div>
                    <div className="art-content">
                        <div className="product-title">法式奶油修女泡芙</div>
                        <div className="product-slogan">層層堆疊的泡芙結構，優雅而細緻。</div>
                    </div>
                </div>
                <div className="section-anti">
                <div className="img-box">
                        <img className="section-img" src="https://images.unsplash.com/photo-1616534900631-c875e41ab2c8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q3JlYW0lMjBQdWZmfGVufDB8fDB8fHww" alt="泡芙麵糰" />
                    </div>
                    <div className="art-content">
                        <div className="product-title">法式閃電泡芙 Éclair</div>
                        <div className="product-slogan">細長外型搭配滑順內餡，是巴黎甜點櫥窗的經典。</div>
                    </div>
                </div>
                <div className="section">
                    <div className="img-box">
                        <img className="section-img" src="https://media.gettyimages.com/id/2154012568/fr/photo/chouquettes-with-sugar-pastries.jpg?s=612x612&w=0&k=20&c=YWqnkX_efIHl7jVNwVathcQe5Rtl_DTcX_eI4WzzVgE=" alt="泡芙麵糰" />
                    </div>
                    <div className="art-content">
                        <div className="product-title">珍珠糖一口泡芙</div>
                        <div className="product-slogan">酥脆外殼與微甜糖粒，帶來輕盈口感。</div>
                    </div>
                </div>
                <div className="section-anti">
                    <div className="img-box">
                        <img className="section-img" src="https://media.gettyimages.com/id/746034619/fr/photo/st-honore-cakes-with-honey.jpg?s=612x612&w=0&k=20&c=hEc-MhzjZm_BKOyo7WjBiNzaagdUS1almOxoYaV7WUM=" alt="泡芙麵糰" />
                    </div>
                    <div className="art-content">
                        <div className="product-title">聖多諾黑焦糖泡芙塔</div>
                        <div className="product-slogan">泡芙、焦糖與香草奶油的完美交響。</div>
                    </div>
                </div>
                <div className="product-slogan">每一款甜點，都是對泡芙工藝的重新詮釋。</div>
            </div>
            <div className="handmade">
                <div className="handmade-img-box">
                    <img className="handmade-img-sm" src="https://images.unsplash.com/photo-1667804957728-fefedd4de4c4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM4OXx8fGVufDB8fHx8fA%3D%3D" alt="手拿泡芙" />

                    <img className="handmade-img-lg" src="https://plus.unsplash.com/premium_photo-1764355177633-7a0755aab91c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmFraW5nJTIwZWNsYWlyc3xlbnwwfHwwfHx8MA%3D%3D" alt="泡芙" />
                </div>
                <div className="handmade-content">
                    <div className="story-title handmade-title">Handcrafted, <br />Not Mass Produced</div>
                    <div className="role-content">
                        <p>在 Divine，我們堅持一件事情：<br /><br />
                            <span className="text-big">所有甜點皆為手工製作。</span><br /><br />
                            我們不追求大量生產，<br />
                            而是專注於每一份甜點的品質。<br /><br />
                            每一次擠花、每一層酥皮、每一顆泡芙，<br />
                            都帶著些微不同的形狀與紋理。<br /><br />
                            那不是不完美。<br /><br />
                            那是手作的痕跡。<br /><br />
                            就像真正的藝術品，<br />
                            沒有兩件會完全相同。<br /><br />
                            也因此，<br />
                            <span className="text-big">每一份 Divine 的甜點，都是 獨一無二的作品。</span></p>
                    </div>
                </div>
            </div>
            <div className="welcome">
                <div className="welcome-content">
                    <div className="role-title">Welcome to Divine</div>

                        <p>在這裡，甜點是一種藝術。也是一種工程。<br />

                        它需要精準、耐心與創造力。<br /><br />

                        Divine 希望帶來的，不只是甜點本身，<br />
                        而是一段值得慢慢品味的時刻。<br /><br />

                        如果有一天，你咬下一口泡芙的瞬間感到幸福——<br /><br />

                        那就是 Divine 存在的理由。</p>
                </div>
                <div className="welcome-title">“Precision in Craft, Poetry in Taste.”</div>
            </div>

        </div>
        </>
    )
};
export default About;