import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { TextField, Button, Grid, MenuItem, Typography, Paper, ThemeProvider, createTheme } from "@mui/material"

// Import the schemas and enums
import { LoanApplicationSchema } from "../types/schema"
import { LoanCategory, LoanSubcategory } from "../types/enum"
import axios from "axios"

type LoanApplicationFormData = z.infer<typeof LoanApplicationSchema>

const generatePassword = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
  let password = ""
  const length = 7
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  return password
}

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
})

export default function LoanApplicationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanApplicationFormData>({
    resolver: zodResolver(LoanApplicationSchema),
    defaultValues: {
      initialDeposit: 0,
    },
  })

  const onSubmit = async (data: LoanApplicationFormData) => {
    const password = generatePassword()
    const submissionData = { ...data, password }
console.log(data,"data");
 // Create FormData object
const formData = new FormData();
// Append each entry manually one by one
formData.append("name", submissionData.name);
formData.append("category", submissionData.category);
formData.append("subcategory", submissionData.subcategory);
formData.append("loanAmount", submissionData.loanAmount.toString());  // Convert numbers to strings
formData.append("loanPeriod", submissionData.loanPeriod.toString());  // Convert numbers to strings
formData.append("initialDeposit", submissionData.initialDeposit.toString());  // Convert numbers to strings
formData.append("email", submissionData.email);
formData.append("location", submissionData.location);
formData.append("phoneNumber", submissionData.phoneNumber);
formData.append("cnic", submissionData.cnic);

// Append the witnesses individually as well
formData.append("witnesses1[name]", submissionData.witnesses1.name);
formData.append("witnesses1[cnic]", submissionData.witnesses1.cnic);
formData.append("witnesses1[phoneNumber]", submissionData.witnesses1.phoneNumber);
formData.append("witnesses1[email]", submissionData.witnesses1.email);

formData.append("witnesses2[name]", submissionData.witnesses2.name);
formData.append("witnesses2[cnic]", submissionData.witnesses2.cnic);
formData.append("witnesses2[phoneNumber]", submissionData.witnesses2.phoneNumber);
formData.append("witnesses2[email]", submissionData.witnesses2.email);
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}application/createApplication`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

      if (response.status >= 200 && response.status < 300) {
        alert("Loan application submitted successfully!")
      } else {
        alert("Failed to submit loan application. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting loan application:", error)
      alert("An error occurred. Please try again later.")
    }
  }

  const renderWitnessFields = (prefix: "witnesses1" | "witnesses2") => (
    <>
      <Typography variant="h6" gutterBottom className="text-primary mt-4">
        {prefix === "witnesses1" ? "Witness 1" : "Witness 2"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`${prefix}.name`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                error={!!errors[prefix]?.name}
                helperText={errors[prefix]?.name?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`${prefix}.cnic`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="CNIC"
                fullWidth
                error={!!errors[prefix]?.cnic}
                helperText={errors[prefix]?.cnic?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`${prefix}.phoneNumber`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                error={!!errors[prefix]?.phoneNumber}
                helperText={errors[prefix]?.phoneNumber?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name={`${prefix}.email`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={!!errors[prefix]?.email}
                helperText={errors[prefix]?.email?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  )

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Paper elevation={3} className="p-8 max-w-4xl w-full bg-white rounded-lg shadow-xl">
          <Typography variant="h4" gutterBottom className="text-center text-primary font-bold mb-8">
            Loan Application Form
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Loan Category"
                      fullWidth
                      error={!!errors.category}
                      helperText={errors.category?.message}
                    >
                      {Object.values(LoanCategory).map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="subcategory"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Loan Subcategory"
                      fullWidth
                      error={!!errors.subcategory}
                      helperText={errors.subcategory?.message}
                    >
                      {Object.values(LoanSubcategory).map((subcategory) => (
                        <MenuItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="loanAmount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Loan Amount"
                      type="number"
                      fullWidth
                      error={!!errors.loanAmount}
                      helperText={errors.loanAmount?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="loanPeriod"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Loan Period (years)"
                      type="number"
                      fullWidth
                      error={!!errors.loanPeriod}
                      helperText={errors.loanPeriod?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="initialDeposit"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Initial Deposit"
                      type="number"
                      fullWidth
                      error={!!errors.initialDeposit}
                      helperText={errors.initialDeposit?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom className="text-primary mt-8 mb-4">
               Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Guarantor Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Location"
                      fullWidth
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="cnic"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="CNIC"
                      fullWidth
                      error={!!errors.cnic}
                      helperText={errors.cnic?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {renderWitnessFields("witnesses1")}
            {renderWitnessFields("witnesses2")}

            <Button type="submit" variant="contained" color="primary" fullWidth size="large" className="mt-8">
              Submit Loan Application
            </Button>
          </form>
        </Paper>
      </div>
    </ThemeProvider>
  )
}

