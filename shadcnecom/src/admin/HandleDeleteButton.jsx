import React, { useState } from "react";
import { 
  AlertDialog, AlertDialogTrigger, AlertDialogContent, 
  AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, 
  AlertDialogDescription 
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { useProductContext } from "../contexts/ProductContext";

const HandleDeleteButton = ({ productId }) => {
  const { deleteProduct } = useProductContext();
  const [open, setOpen] = useState(false); 

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(productId);
      if (res === 200) {
        alert("Product deleted successfully!");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={() => setOpen(true)}>Delete Product</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Deleting the product will remove it permanently.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default HandleDeleteButton;
