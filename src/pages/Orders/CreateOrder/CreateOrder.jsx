import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../features/usersSlice";
import { useTranslation } from "react-i18next";
import { fetchCategories } from "../../../features/categoriesSlice";
import { fetchProducts } from "../../../features/productsSlice";

export default function CreateOrder() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [allUsers, setAllUsers] = useState([]);
  const [userData, setUSerData] = useState([]);
  const { data, loading } = useSelector((state) => state?.users);
  const { data: allCategories } = useSelector((state) => state?.categories);
  const { data: allProducts } = useSelector((state) => state?.products);
  const [specificProducts, setSpecificProduct] = useState([]);
  const [createOrderData, setCreateOrderData] = useState({
    name: "",
    category: "",
    product: "",
  });
  useEffect(() => {
    dispatch(fetchCategories({ page: 1, per_page: 7 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .then((res) => {
        {
          if (res?.success) {
            setUSerData(res?.data);
          }
        }
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  useEffect(() => {
    console.log(data, allCategories);
  }, [data, allCategories]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, per_page: 20 }));
  }, [dispatch]);

  useEffect(() => {
    if (!allProducts?.data?.products || !createOrderData?.category) {
      return; // إذا لم تكن هناك بيانات، لا تفعل شيئًا
    }

    console.log("جميع المنتجات:", allProducts?.data?.products);

    const filteredData = allProducts.data.products.filter(
      (item) => item?.category_id == createOrderData.category
    );

    if (filteredData.length > 0) {
      setSpecificProduct(filteredData);
    } else {
      setSpecificProduct([]); // تأكد من تعيين مصفوفة فارغة إذا لم تكن هناك منتجات مطابقة
    }
  }, [allProducts, createOrderData]);

  useEffect(() => {
    console.log(allProducts, specificProducts);
  }, [allProducts, specificProducts]);

  function handleAddToCart() {}

  return (
    <div>
      <h4 className="font-semibold text-[20px] md:text-[25px] text-[#0d6efd]">
        إنشاء طلب
      </h4>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="input-group">
          <label>{t("chooseUserText")}</label>
          <select
            onChange={(e) =>
              setCreateOrderData({ ...createOrderData, name: e.target.value })
            }
          >
            <option value="">{t("selectUser")}</option>
            {userData?.map((item) => (
              <option value={item?.user_id}>{item?.username}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>{t("chooseCategory")}</label>
          <select
            onChange={(e) =>
              setCreateOrderData({
                ...createOrderData,
                category: e.target.value,
              })
            }
          >
            <option value="">{t("selectCategory")}</option>

            {allCategories?.data?.categories?.map((item) => (
              <option value={item?.category_id}>{item?.title}</option>
            ))}
          </select>
        </div>
      </div>
      {specificProducts?.length ? (
        <div className="input-group my-4">
          <label>{t("chooseProduct")}</label>
          <select
            onChange={(e) =>
              setCreateOrderData({
                ...createOrderData,
                product: e.target.value,
              })
            }
          >
            <option value="">{t("selectProduct")}</option>

            {specificProducts.map((item) => (
              <option key={item?.product_id} value={item?.product_id}>
                {item?.title}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <button className="bg-[#0d6efd] my-4 text-white p-2 rounded-md">
        {t("addText")}
      </button>
    </div>
  );
}
