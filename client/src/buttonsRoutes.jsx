import { useSelector } from "react-redux"
import {
    Flex,
    Text,
    Icon,
} from "@chakra-ui/react"

//icons
import { FiShoppingCart } from 'react-icons/fi';
import { MdSmartphone } from "react-icons/md"
import { IoMdPersonAdd } from "react-icons/io"
import { RiLoginBoxFill } from "react-icons/ri"
import { CgProfile } from 'react-icons/cg';
import { MdLocalShipping, MdOutlineAdminPanelSettings } from 'react-icons/md';

const ShoppingCartIcon = () => {
    const cartInfo = useSelector((state) => state.cart);
    const { cart } = cartInfo;
    return (
        <Flex>
            <Text as='bold' fontSize='s' p={1}>
                Cart ({cart.length == 0 ? 'Empty' : cart.length})
            </Text>
        </Flex>
    );
};

const routes =
{
    navbar: [
        {
            name: 'Products',
            path: "/products",
            icon: <MdSmartphone />
        },
        {
            name: <ShoppingCartIcon />,
            path: "/cart",
            icon: <FiShoppingCart />
        },
    ],
    userMenu: [
        {
            name: 'Profile',
            path: "/profile",
            icon: <CgProfile />
        },
        {
            name: 'Order',
            path: "/your-orders",
            icon: <MdLocalShipping />
        },
        {
            name: 'Admin Panel',
            path: "/admin-panel",
            icon: <MdOutlineAdminPanelSettings />
        },
    ],
    authorization: [
        {
            name: 'Sing In',
            path: "/login",
            icon: <RiLoginBoxFill />
        },
        {
            name: "Sign Up",
            path: "/register",
            icon: <IoMdPersonAdd />

        },
    ],
    aboutUs: [
        {
            name: 'Contacts',
            path: '/contacts'
        },
        {
            name: 'Guarantees and Servies',
            path: '/contacts'
        },
        {
            name: 'Reviews',
            path: "/reviews"
        }
    ]
}

export default routes;