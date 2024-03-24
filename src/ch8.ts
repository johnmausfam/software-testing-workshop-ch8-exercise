export type BookData = { title:string; price: number; tags: string[]; }
export class BookCollection{
    private books:BookData[];

    constructor(books:BookData[]){
        this.books = books;
    }

    //以輸入空間劃分 - 完全組合覆蓋(ACoC)做測試設計
    public sortByPrice(){
        return this.books.sort((a, b)=> b.price - a.price);
    }

    //以控制流圖 - 主路徑覆蓋(PPC)做測試設計
    public searchByTag(tag:string):BookData[] {
        let matched:BookData[] = [];
        for(let i = 0;i < this.books.length;i++){
            if(this.books[i].tags.includes(tag)){
                matched.push(this.books[i]);
            }
        }
        return matched;
    }

    //練習測試替身
    public writeToStorage(storageKey:string){
        localStorage.setItem(storageKey, JSON.stringify(this.books));
    }
}