export interface productData{
name: string;
description: string;
price: number;
available: number;
subCategoryId: number
}

export interface getProductsResponse{
id: number;
name: string;
price: string;
imagePath: string;
SubCategory: {
    id: number;
    subcategoryname: string;
}
}

export interface Product {
  id: number;
  name: string;
  description: string; 
  price: number;       
  available: number;   
  imagePath: string;
  isDeleted: boolean;  
  SubCategory: {
    id: number;
    subcategoryname: string;
    category?: {       
      id: number;
      categoryname: string;
      producttype?: {
        id: number;
        typename: string;
      }
    }
  };
}


export interface GetProductsResponse {
  data: Product[]; 
  meta: {
    total: number;
    page: number;
    lastPage: number;
  };
}



export interface getproductdetailresponse extends getProductsResponse{
description: string;
available: number;
SubCategory: {
    id: number;
    subcategoryname: string;
   category: {
    id: number;
    categoryname: string;
    producttype: {
        id: number;
        typename: string;

    }
   }
}
}


