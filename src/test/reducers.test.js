import { loginReducer, typeUserReducer } from "../redux/reducers/reducers"
import { types } from "../redux/types/types"
import { shallow } from 'enzyme'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRouter from "../routers/PrivateRouter"
import { Dasboard } from "../routers/Dashboard"
import AdminRouters from "../routers/AdminRouters"
import Crud from "../components/control/Crud"

describe('Pruebas de usuarios', () => {
    // Prueba de que al iniciar sesion el reducer nos devuelva el usuario
    test('Prueba de usuario registrado', () => {
        const action = {
            type: types.login,
            payload: {
                id: "XzghYqMSGgZrQC1TaVf5w39oKLn1",
                displayname: "kekene1002@sueshaw.com"
            }
        }

        const initialState = {}

        const stado = loginReducer(initialState, action)
        expect(stado).toEqual({
            id: "XzghYqMSGgZrQC1TaVf5w39oKLn1",
            name: "kekene1002@sueshaw.com"
        })
    })

    // Prueba que el usuario que se le envia no reciba permisos de administrados
    test('El usuario admin sea igual false', () => {
        const action = {
            type: types.typeUser,
            payload: false
        }
        const initialState = false
        const userAdmin = typeUserReducer(initialState, action)
        expect(userAdmin).toEqual({ "admin": false })
    })

    test('Muestre cuando el usuario esta autenticado', () => {
        const isAuthenticated = false

        const wrapper = shallow(
            <Router>
                <Routes>
                    <Route path='/*' element={<PrivateRouter isAuthenticated={isAuthenticated}>
                        <Dasboard />
                    </PrivateRouter>} />
                </Routes>
            </Router>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find(Route).prop('element').props.isAuthenticated).toBeFalsy()
    })

    test('Muestra cuando el usuario es administrador', () => {
        const isAdmin = false
        const wrapper = shallow(
            <Router>
                <Routes>
                    <Route path='/controlDatos' element={<AdminRouters isAdmin={isAdmin}>
                        <Crud />
                    </AdminRouters>} />
                </Routes>
            </Router>
        )
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find(Route).prop('element').props.isAdmin).toBeFalsy()
    })
})