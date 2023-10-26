import { render } from '@testing-library/react-native'
import Cadastro from './cadastro'

describe('<Cadastro/>', () => {
 it('should be defined', () => {
  const component = render(<Cadastro />)
  expect(component).toBeTruthy()
  expect(component).toBeDefined()
 })
})