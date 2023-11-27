import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './layout/Navigation';

import MinSection from './pages/minSection';
import ShowProduct from './producto/ShowProduct';
import AddProduct from './producto/AddProduct';
import DeleteProduct from './producto/DeleteProduct';
import EditProduct from './producto/EditProduct';
import Warranty from './pages/warrantyList';
import AddWarranty from './garantia/AddWarranty';
import EditWarranty from './garantia/EditWarranty';
import DeleteWarranty from './garantia/DeleteWarranty';
import ShowWarranty from './garantia/ShowWarranty';
import AddVehicle from './vehicle/AddVehicle';
import ShowVehicle from './vehicle/ShowVehicle';
import EditVehicle from './vehicle/EditVehicle';
import DeleteVehicle from './vehicle/DeleteVehicle';
import VehicleList from './pages/vehicleList';
import AddClient from './client/AddClient';
import ShowClient from './client/ShowClient';
import EditClient from './client/EditClient';
import DeleteClient from './client/DeleteClient';
import ClientList from './pages/clientList';
import ShowSale from './sale/ShowSale';
import EditSale from './sale/EditSale';
import AddSale from './sale/AddSale';
import DeleteSale from './sale/DeleteSale';
import AddBuys from './buy/AddBuys';
import ShowBuys from './buy/ShowBuys';
import EditBuys from './buy/EditBuys';
import DeleteBuys from './buy/DeleteBuys';
import BuysList from './pages/buyList';
import BranchList from './pages/branchList';
import AddBranches from './branch/AddBranch';
import List from './pages/productList';
import Sales from './pages/saleList';
import EmployeeList from './pages/employeeList';
import AddEmployee from './employee/AddEmployee';
import ShowEmployee from './employee/ShowEmployee';
import EditEmployee from './employee/EditEmployee';

const PrivateRoutes = () => {
  return (
    <React.Fragment>
    <Navigation />

    <Routes caseSensitive>
      <Route exact path="/ShowProduct" element={<ShowProduct />} />
      <Route exact path="/MainSection" element={<MinSection />} />
      <Route exact path="/AddProduct" element={<AddProduct />} />
      <Route exact path="/DeleteProduct" element={<DeleteProduct />} />
      <Route exact path="/EditProduct" element={<EditProduct />} />
      <Route exact path="/Warranty" element={<Warranty />} />
      <Route exact path="/Sales" element={<Sales />} />
      <Route exact path="/AddWarranty" element={<AddWarranty />} />
      <Route exact path="/EditWarranty" element={<EditWarranty />} />
      <Route exact path="/DeleteWarranty" element={<DeleteWarranty />} />
      <Route exact path="/ShowWarranty" element={<ShowWarranty />} />
      <Route exact path="/AddVehicle" element={<AddVehicle />} />
      <Route exact path="/ShowVehicle" element={<ShowVehicle />} />
      <Route exact path="/EditVehicle" element={<EditVehicle />} />
      <Route exact path="/DeleteVehicle" element={<DeleteVehicle />} />
      <Route exact path="/Vehicle" element={<VehicleList />} />
      <Route exact path="/AddClient" element={<AddClient />} />
      <Route exact path="/ShowClient" element={<ShowClient />} />
      <Route exact path="/EditClient" element={<EditClient />} />
      <Route exact path="/DeleteClient" element={<DeleteClient />} />
      <Route exact path="/Client" element={<ClientList />} />
      <Route exact path="/ShowSale" element={<ShowSale />} />
      <Route exact path="/EditSale" element={<EditSale />} />
      <Route exact path="/AddSale" element={<AddSale />} />
      <Route exact path="/DeleteSale" element={<DeleteSale />} />
      <Route exact path="/AddBuys" element={<AddBuys />} />
      <Route exact path="/ShowBuys" element={<ShowBuys />} />
      <Route exact path="/EditBuys" element={<EditBuys />} />
      <Route exact path="/DeleteBuys" element={<DeleteBuys />} />
      <Route exact path="/Buys" element={<BuysList />} />
      <Route exact path="/ProductList" element={<List />} />
      <Route exact path="/Branch" element={<BranchList />} />
      <Route exact path="/AddBranch" element={<AddBranches />} />
      <Route exact path="/Employee" element={<EmployeeList />} />
      <Route exact path="/AddEmployee" element={<AddEmployee />} />
      <Route exact path="/ShowEmployee" element={<ShowEmployee />} />
      <Route exact path="/EditEmployee" element={<EditEmployee />} />
    </Routes>
    </React.Fragment>

  );
};

export default PrivateRoutes;