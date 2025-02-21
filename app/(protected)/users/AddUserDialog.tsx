"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddUserDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [role, setRole] = useState("1");

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;

    // Name validation
    if (!name.trim()) {
      setNameError("Campo obrigatório");
      isValid = false;
    } else {
      setNameError("");
    }

    // Email validation
    if (!email.trim()) {
      setEmailError("Campo obrigatório");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("E-mail inválido");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Campo obrigatório");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Confirm Password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Campo obrigatório");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("A senha não confere");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    // Phone validation
    if (!phoneNumber.trim()) {
      setPhoneError("Campo obrigatório");
      isValid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Telefone inválido");
      isValid = false;
    } else {
      setPhoneError("");
    }

    return isValid;
  };

  const handleAddUser = (e: React.MouseEvent) => {
    e.preventDefault(); // Previene o fechamento automático
    if (!validateForm()) return;

    const newUser = {
      name,
      email,
      password,
      phoneNumber,
      role: Number(role),
    };

    console.log("Novo usuário:", newUser);

    // Reset form
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setRole("1");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="px-3">Adicionar usuário</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar usuário</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha todos os campos obrigatórios para adicionar um novo usuário.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <div>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome do usuário"
              />
              {nameError && (
                <p className="text-sm text-red-500 mt-1">{nameError}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!e.target.value.trim()) {
                    setEmailError("Campo obrigatório");
                  } else if (!emailRegex.test(e.target.value)) {
                    setEmailError("E-mail inválido");
                  } else {
                    setEmailError("");
                  }
                }}
                placeholder="email@exemplo.com"
              />
              {emailError && (
                <p className="text-sm text-red-500 mt-1">{emailError}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
              {passwordError && (
                <p className="text-sm text-red-500 mt-1">{passwordError}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Repetir Senha</Label>
            <div>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);
                  if (value !== password) {
                    setConfirmPasswordError("A senha não confere");
                  } else {
                    setConfirmPasswordError("");
                  }
                }}
                placeholder="Repita a senha"
              />
              {confirmPasswordError && (
                <p className="text-sm text-red-500 mt-1">{confirmPasswordError}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="phoneNumber">Telefone</Label>
            <div>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  setPhoneNumber(value);
                  const phoneRegex = /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
                  if (!value.trim()) {
                    setPhoneError("Campo obrigatório");
                  } else if (!phoneRegex.test(value)) {
                    setPhoneError("Telefone inválido");
                  } else {
                    setPhoneError("");
                  }
                }}
                placeholder="(xx) xxxxx-xxxx"
              />
              {phoneError && (
                <p className="text-sm text-red-500 mt-1">{phoneError}</p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="role">Função</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Administrador</SelectItem>
                <SelectItem value="2">Técnico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAddUser}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Adicionar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}