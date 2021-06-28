import {Controller, useForm, useWatch} from "react-hook-form";
import React, {FunctionComponent} from "react";
import {Avatar, Box, Paper, TextField, Typography} from "@material-ui/core";
import {LoginOutlined} from "@material-ui/icons";
import {FormattedMessage, useIntl} from "react-intl";
import {ConditionalLink, EMAIL_REGEX, StatusButton} from "@crud-studio/react-crud-components";
import InputUtils from "../../helpers/InputUtils";
import useLoginEmailPassword from "../../apis/hooks/login/useLoginEmailPassword";
import {useUpdateEffect} from "react-use";
import {AuthResponseRO} from "../../models/server";

interface IProps {
  logoSrc?: string;
  logoUrl?: string;
  logoHeight?: number;
  titleKey?: string;
  subtitleKey?: string;
  onLoginSuccess: (authResponse: AuthResponseRO) => void;
}

type FormValues = {
  email: string;
  password: string;
};

const LoginEmailPasswordCard: FunctionComponent<IProps> = ({
  logoSrc,
  logoUrl,
  logoHeight,
  titleKey,
  subtitleKey,
  onLoginSuccess,
}) => {
  const intl = useIntl();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const email = useWatch({control, name: "email", defaultValue: ""});
  const password = useWatch({control, name: "password", defaultValue: ""});

  const loginState = useLoginEmailPassword(email, password);

  useUpdateEffect(() => {
    if (loginState.result) {
      onLoginSuccess(loginState.result);
    }
  }, [loginState.result]);

  const onSubmit = handleSubmit((data): void => {
    loginState.executeRequest();
  });

  return (
    <Paper
      variant="elevation"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box sx={{mb: 2}}>
        {!!logoSrc ? (
          <ConditionalLink to={logoUrl || "/"} condition={!!logoUrl}>
            <img src={logoSrc} alt="Logo" height={logoHeight || 30} />
          </ConditionalLink>
        ) : (
          <Avatar sx={{mb: 1, bgcolor: "primary.main"}}>
            <LoginOutlined />
          </Avatar>
        )}
      </Box>
      <Typography component="h1" variant="h2" sx={{textAlign: "center"}}>
        <FormattedMessage id={titleKey || "pages.connect-title"} />
      </Typography>
      <Typography component="div" variant="body2" sx={{textAlign: "center"}}>
        <FormattedMessage id={subtitleKey || "pages.connect-subtitle"} />
      </Typography>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 1, width: "100%"}}>
        <Controller
          name="email"
          rules={{
            required: intl.formatMessage({id: "pages.required-field"}),
            pattern: {value: EMAIL_REGEX, message: intl.formatMessage({id: "pages.email-invalid"})},
          }}
          control={control}
          defaultValue=""
          render={({field}: any) => {
            return (
              <TextField
                margin="normal"
                required
                fullWidth
                label={intl.formatMessage({id: "pages.email"})}
                value={field.value}
                type="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {
                  field.onChange(e);
                  InputUtils.inputRemoveWhitespaces(e);
                }}
                inputProps={{
                  maxLength: 50,
                }}
                error={!!errors.email}
                helperText={errors?.email?.message}
                ref={field.ref}
              />
            );
          }}
        />

        <Controller
          name="password"
          rules={{required: intl.formatMessage({id: "pages.required-field"})}}
          control={control}
          defaultValue=""
          render={({field}: any) => {
            return (
              <TextField
                margin="normal"
                required
                fullWidth
                label={intl.formatMessage({id: "pages.password"})}
                value={field.value}
                type="password"
                autoComplete="current-password"
                onChange={(e) => {
                  field.onChange(e);
                  InputUtils.inputRemoveWhitespaces(e);
                }}
                inputProps={{
                  maxLength: 30,
                }}
                error={!!errors.password}
                helperText={errors?.password?.message}
                ref={field.ref}
              />
            );
          }}
        />

        <StatusButton type="submit" fullWidth variant="contained" sx={{mt: 2}} loading={loginState.loading}>
          <FormattedMessage id="pages.connect" />
        </StatusButton>
      </Box>
    </Paper>
  );
};
export default LoginEmailPasswordCard;
