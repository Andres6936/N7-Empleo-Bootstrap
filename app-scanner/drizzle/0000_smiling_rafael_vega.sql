CREATE TABLE `Products`
(
    `SKU`         text PRIMARY KEY NOT NULL,
    `TypeBarCode` text             NOT NULL,
    `Name`        text             NOT NULL,
    `Amount`      integer          NOT NULL,
    `Value`       integer          NOT NULL
);
