import { render } from '@testing-library/react-native'
import Cadastro from '../app/public/cadastro'

describe('<Cadastro/>', () => {
 it('should be defined', () => {
  const component = render(<Cadastro />)
  expect(component).toBeTruthy()
  expect(component).toBeDefined()
 })
})