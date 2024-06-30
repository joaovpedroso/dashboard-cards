import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import TextFieldCpf from "~/components/TextFieldCpf";
import routes from "~/router/routes";
import * as S from "./styles";
import { UserSchema } from "./schema";
import { z } from "zod";
import useNewRegistration from "~/hooks/useNewRegistration";
import useToast from "~/hooks/useToast";
import { useState } from "react";
import ConfirmationModal from "~/components/ConfirmationModal";

export type FormData = z.infer<typeof UserSchema>;

const NewUserPage = () => {

  const [isVisibleConfirmationModal, setIsVisibleConfirmationModal] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema)
  });
    
  const history = useHistory();
  const { successToast, errorToast } = useToast();

  const { create, formatNewRegistrationValues } = useNewRegistration({
    onSuccess: () => {
      successToast("Usuário criado com sucesso!");
      goToHome();
    },
    onError: () => {
      errorToast("Não foi possível criar o usuário.");
    }
  });

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const onSubmit = () => {
    setIsVisibleConfirmationModal(true);
  };

  const handleConfirm = () => {
    const formValues = getValues();
    const formatedValues = formatNewRegistrationValues(formValues);
    
    create(formatedValues);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsVisibleConfirmationModal(false);
  };

  return (
    <>
    <S.Container>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <S.Card>
          <IconButton type="buton" onClick={() => goToHome()} aria-label="back">
            <HiOutlineArrowLeft size={24} />
          </IconButton>

          <Controller
            name="employeeName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField placeholder="Nome" label="Nome" onChange={onChange} value={value ?? ""} error={errors?.employeeName?.message ?? ""}  />
            )}
          />


          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField placeholder="Email" label="Email" type="email" onChange={onChange} value={value ?? ""} error={errors?.email?.message ?? ""} />
            )}
            />

          <Controller
            name="cpf"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextFieldCpf placeholder="CPF" label="CPF" $handleChange={onChange} value={value ?? ""} error={errors?.cpf?.message ?? ""} />
            )}
            />

          <Controller
            name="admissionDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField id="admissionDate" label="Data de admissão" type="date" onChange={onChange} value={value ?? ""} error={errors?.admissionDate?.message ?? ""} />
            )}
            />

          <Button type="submit">Cadastrar</Button>
        </S.Card>
      </form>
    </S.Container>
      {isVisibleConfirmationModal && <ConfirmationModal isOpen subtitle="Um novo usuário será criado." onConfirm={handleConfirm} onRefuse={handleCloseModal} />}
    </>
  );
};

export default NewUserPage;
