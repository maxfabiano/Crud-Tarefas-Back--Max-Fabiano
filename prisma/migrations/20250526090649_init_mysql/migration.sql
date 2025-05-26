-- CreateTable
CREATE TABLE `clientes` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `DataHoraCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `Codigo` VARCHAR(15) NOT NULL,
    `Nome` VARCHAR(150) NOT NULL,
    `CPF_CNPJ` VARCHAR(20) NOT NULL,
    `CEP` INTEGER NOT NULL,
    `Logradouro` VARCHAR(100) NOT NULL,
    `Endereco` VARCHAR(120) NOT NULL,
    `Numero` VARCHAR(20) NOT NULL,
    `Bairro` VARCHAR(50) NOT NULL,
    `Cidade` VARCHAR(60) NOT NULL,
    `UF` VARCHAR(2) NOT NULL,
    `Complemento` VARCHAR(150) NULL,
    `Fone` VARCHAR(15) NULL,
    `LimiteCredito` DOUBLE NOT NULL,
    `Validade` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
