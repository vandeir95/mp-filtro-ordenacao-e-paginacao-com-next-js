

import FilterDropdown from '@/components/filter-dropdown';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import axios from 'axios';
import { link } from 'fs';
import { url } from 'inspector';
import { Columns4 } from 'lucide-react';


type ComponentProps = {
  searchParams?: {
    search?: string;
    status?: string;
    sort?: string;
    page?: number;
  };
}

export default async function Component({searchParams}: ComponentProps)
 {

  
  // fect dos dados 
  const response = await axios.get('https://apis.codante.io/api/orders-api/orders', {
    params: {
      search: searchParams?.search,
        status: searchParams?.status,
        sort: searchParams?.sort,
        page: searchParams?.page,

        

    },
  })
  const orders = response.data.data
const lastPage = response.data.meta

 let links : {url: string; 
  label: string;
  active: boolean;
  id:number}[] = 
  response.data.meta.links; 

   links = links.map((link, index) => (
    { ...link,id: index }
   ) )


   
  
  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable orders = {orders} />
          <div className="mt-8">
            <Pagination links={links} lastPage = {lastPage} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
