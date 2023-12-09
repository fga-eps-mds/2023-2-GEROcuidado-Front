import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import EditarRotina from "../private/pages/editarRotina";

describe("CadastrarRotina Component", () => {
  it("Salvar sem titulo", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarRotina />,
    );

    const titulo = getByPlaceholderText("Adicionar título");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(titulo, "");
      fireEvent.press(salvar);
    });
    const erroTitulo = getByTestId("Erro-titulo");

    expect(erroTitulo.props.children.props.text).toBe("Campo obrigatório!");
  });

  it("Salvar com titulo muito grande", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarRotina />,
    );

    const titulo = getByPlaceholderText("Adicionar título");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(
        titulo,
        "Por que o livro de matemática está sempre triste? Porque tem muitos problemas! hahahahahahhahahahahhahahaahahahahahahhahahahahahahahahahahahhahaahahahahahahahahah",
      );
      fireEvent.press(salvar);
    });
    const erroTitulo = getByText("O título deve ter no máximo 100 caractéres.");

    expect(erroTitulo).toBeTruthy();
  });

  it("Salvar data com formato errado", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarRotina />,
    );

    const data = getByPlaceholderText("Data da rotina");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(data, "2010");
      fireEvent.press(salvar);
    });
    const erroData = getByTestId("Erro-data");

    expect(erroData.props.children.props.text).toBe(
      "Data deve ser no formato dd/mm/yyyy!",
    );
  });

  it("Salvar sem hora", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarRotina />,
    );

    const hora = getByPlaceholderText("Horário de início");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(hora, "");
      fireEvent.press(salvar);
    });
    const erroHora = getByTestId("Erro-hora");

    expect(erroHora.props.children.props.text).toBe("Campo obrigatório");
  });

  it("Salvar hora com formato errado", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarRotina />,
    );

    const hora = getByPlaceholderText("Horário de início");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(hora, "201");
      fireEvent.press(salvar);
    });
    const erroHora = getByTestId("Erro-hora");

    expect(erroHora.props.children.props.text).toBe(
      "Hora deve ser no formato hh:mm!",
    );
  });

  it("Salvar com descrição muito grande", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <EditarRotina />,
    );

    const descricao = getByPlaceholderText("Descrição");
    const salvar = getByText("Salvar");

    act(() => {
      fireEvent.changeText(
        descricao,
        "Num universo vasto e misterioso, onde galáxias dançam em uma sinfonia cósmica, a teia da existência se entrelaça, conectando cada átomo e cada pensamento em uma tapeçaria intricada de tempo e espaço; neste intricado emaranhado, as histórias dos indivíduos se entrelaçam, tecendo um tecido social complexo onde sonhos se desdobram e destinos se entrelaçam, criando uma narrativa épica que transcende as fronteiras do tempo, desafiando a compreensão humana e convidando-nos a contemplar a beleza efêmera da vida, como se fôssemos observadores temporários de um espetáculo cósmico em constante evolução, onde cada escolha, cada suspiro, ecoa através das eras, deixando uma marca indelével na vastidão do infinito.",
      );
      fireEvent.press(salvar);
    });
    const erroDescricao = getByText(
      "A descrição deve ter no máximo 300 caracteres.",
    );

    expect(erroDescricao).toBeTruthy();
  });
});
