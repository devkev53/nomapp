CREATE TABLE IF NOT EXISTS public.auth_group
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(150) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT auth_group_pkey PRIMARY KEY (id),
    CONSTRAINT auth_group_name_key UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.auth_group_permissions
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    group_id integer NOT NULL,
    permission_id integer NOT NULL,
    CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id),
    CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id)
);

CREATE TABLE IF NOT EXISTS public.auth_permission
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT auth_permission_pkey PRIMARY KEY (id),
    CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename)
);

CREATE TABLE IF NOT EXISTS public.companies_company
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    address character varying(255) COLLATE pg_catalog."default",
    city character varying(255) COLLATE pg_catalog."default",
    phone character varying(15) COLLATE pg_catalog."default",
    logo character varying(100) COLLATE pg_catalog."default",
    email character varying(254) COLLATE pg_catalog."default",
    created_by_id bigint,
    updated_by_id bigint,
    description text COLLATE pg_catalog."default",
    CONSTRAINT companies_company_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.django_admin_log
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    action_time timestamp with time zone NOT NULL,
    object_id text COLLATE pg_catalog."default",
    object_repr character varying(200) COLLATE pg_catalog."default" NOT NULL,
    action_flag smallint NOT NULL,
    change_message text COLLATE pg_catalog."default" NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.django_content_type
(
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    app_label character varying(100) COLLATE pg_catalog."default" NOT NULL,
    model character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT django_content_type_pkey PRIMARY KEY (id),
    CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model)
);

CREATE TABLE IF NOT EXISTS public.django_migrations
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    app character varying(255) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    applied timestamp with time zone NOT NULL,
    CONSTRAINT django_migrations_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.django_session
(
    session_key character varying(40) COLLATE pg_catalog."default" NOT NULL,
    session_data text COLLATE pg_catalog."default" NOT NULL,
    expire_date timestamp with time zone NOT NULL,
    CONSTRAINT django_session_pkey PRIMARY KEY (session_key)
);

CREATE TABLE IF NOT EXISTS public.docs_employedocuments
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying(125) COLLATE pg_catalog."default" NOT NULL,
    document character varying(100) COLLATE pg_catalog."default" NOT NULL,
    type character varying(50) COLLATE pg_catalog."default" NOT NULL,
    expiration_date date NOT NULL,
    employee_id bigint NOT NULL,
    CONSTRAINT docs_employedocuments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.employees_employee
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    address character varying(255) COLLATE pg_catalog."default",
    phone character varying(15) COLLATE pg_catalog."default",
    birthday date,
    gender character varying(10) COLLATE pg_catalog."default" NOT NULL,
    photo character varying(100) COLLATE pg_catalog."default",
    start_work_date date,
    created_by_id bigint,
    job_position_id bigint,
    updated_by_id bigint,
    user_id bigint,
    CONSTRAINT employees_employee_pkey PRIMARY KEY (id),
    CONSTRAINT employees_employee_user_id_key UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS public.employees_familymember
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    address character varying(255) COLLATE pg_catalog."default",
    phone character varying(15) COLLATE pg_catalog."default",
    birthday date,
    gender character varying(10) COLLATE pg_catalog."default" NOT NULL,
    relation character varying(10) COLLATE pg_catalog."default" NOT NULL,
    dependent boolean NOT NULL,
    created_by_id bigint,
    employee_id bigint NOT NULL,
    updated_by_id bigint,
    CONSTRAINT employees_familymember_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.pays_payment
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    amount numeric(10, 2) NOT NULL,
    day smallint NOT NULL,
    month smallint NOT NULL,
    year smallint NOT NULL,
    type character varying(15) COLLATE pg_catalog."default" NOT NULL,
    created_by_id bigint,
    employee_id bigint NOT NULL,
    updated_by_id bigint,
    CONSTRAINT pays_payment_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.positions_department
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    company_id bigint NOT NULL,
    created_by_id bigint,
    updated_by_id bigint,
    CONSTRAINT positions_department_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.positions_jobposition
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying(120) COLLATE pg_catalog."default" NOT NULL,
    salary numeric(12, 2) NOT NULL,
    department_id bigint NOT NULL,
    CONSTRAINT positions_jobposition_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.positions_jobpromotion
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    employee integer NOT NULL,
    old_job_position integer NOT NULL,
    old_department integer NOT NULL,
    old_salary numeric(12, 2) NOT NULL,
    new_job_position integer NOT NULL,
    new_department integer NOT NULL,
    new_salary numeric(12, 2) NOT NULL,
    date_start_new_position date NOT NULL,
    created_by_id bigint,
    updated_by_id bigint,
    CONSTRAINT positions_jobpromotion_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.products_product
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    name character varying(125) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    price numeric(10, 2) NOT NULL,
    stock integer NOT NULL,
    created_by_id bigint,
    updated_by_id bigint,
    CONSTRAINT products_product_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.products_productimage
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    name character varying(250) COLLATE pg_catalog."default" NOT NULL,
    image character varying(100) COLLATE pg_catalog."default" NOT NULL,
    product_id bigint NOT NULL,
    CONSTRAINT products_productimage_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.store_sale
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    paid_status boolean NOT NULL,
    total numeric(10, 2) NOT NULL,
    created_by_id bigint,
    employee_id bigint NOT NULL,
    updated_by_id bigint,
    CONSTRAINT store_sale_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.store_saledetail
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created date,
    updated date,
    is_active boolean NOT NULL,
    amount smallint NOT NULL,
    total numeric(10, 2) NOT NULL,
    created_by_id bigint,
    product_id bigint NOT NULL,
    sale_id bigint NOT NULL,
    updated_by_id bigint,
    CONSTRAINT store_saledetail_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.token_blacklist_blacklistedtoken
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    blacklisted_at timestamp with time zone NOT NULL,
    token_id bigint NOT NULL,
    CONSTRAINT token_blacklist_blacklistedtoken_pkey PRIMARY KEY (id),
    CONSTRAINT token_blacklist_blacklistedtoken_token_id_key UNIQUE (token_id)
);

CREATE TABLE IF NOT EXISTS public.token_blacklist_outstandingtoken
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    token text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone,
    expires_at timestamp with time zone NOT NULL,
    user_id bigint,
    jti character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT token_blacklist_outstandingtoken_pkey PRIMARY KEY (id),
    CONSTRAINT token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq UNIQUE (jti)
);

CREATE TABLE IF NOT EXISTS public.users_historicaluser
(
    id bigint NOT NULL,
    password character varying(128) COLLATE pg_catalog."default" NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default" NOT NULL,
    name character varying(150) COLLATE pg_catalog."default",
    last_name character varying(150) COLLATE pg_catalog."default",
    phone character varying(15) COLLATE pg_catalog."default",
    image text COLLATE pg_catalog."default",
    address character varying(250) COLLATE pg_catalog."default",
    birthday date,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    history_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    history_date timestamp with time zone NOT NULL,
    history_change_reason character varying(100) COLLATE pg_catalog."default",
    history_type character varying(1) COLLATE pg_catalog."default" NOT NULL,
    history_user_id bigint,
    CONSTRAINT users_historicaluser_pkey PRIMARY KEY (history_id)
);

CREATE TABLE IF NOT EXISTS public.users_user
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    password character varying(128) COLLATE pg_catalog."default" NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) COLLATE pg_catalog."default" NOT NULL,
    email character varying(150) COLLATE pg_catalog."default" NOT NULL,
    name character varying(150) COLLATE pg_catalog."default",
    last_name character varying(150) COLLATE pg_catalog."default",
    phone character varying(15) COLLATE pg_catalog."default",
    image character varying(100) COLLATE pg_catalog."default",
    address character varying(250) COLLATE pg_catalog."default",
    birthday date,
    is_active boolean NOT NULL,
    is_staff boolean NOT NULL,
    CONSTRAINT users_user_pkey PRIMARY KEY (id),
    CONSTRAINT users_user_email_key UNIQUE (email),
    CONSTRAINT users_user_username_key UNIQUE (username)
);

CREATE TABLE IF NOT EXISTS public.users_user_groups
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    group_id integer NOT NULL,
    CONSTRAINT users_user_groups_pkey PRIMARY KEY (id),
    CONSTRAINT users_user_groups_user_id_group_id_b88eab82_uniq UNIQUE (user_id, group_id)
);

CREATE TABLE IF NOT EXISTS public.users_user_user_permissions
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    user_id bigint NOT NULL,
    permission_id integer NOT NULL,
    CONSTRAINT users_user_user_permissions_pkey PRIMARY KEY (id),
    CONSTRAINT users_user_user_permissions_user_id_permission_id_43338c45_uniq UNIQUE (user_id, permission_id)
);

ALTER TABLE IF EXISTS public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id)
    REFERENCES public.auth_permission (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS auth_group_permissions_permission_id_84c5c92e
    ON public.auth_group_permissions(permission_id);


ALTER TABLE IF EXISTS public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id)
    REFERENCES public.auth_group (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS auth_group_permissions_group_id_b120cbf9
    ON public.auth_group_permissions(group_id);


ALTER TABLE IF EXISTS public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id)
    REFERENCES public.django_content_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS auth_permission_content_type_id_2f476e4b
    ON public.auth_permission(content_type_id);


ALTER TABLE IF EXISTS public.companies_company
    ADD CONSTRAINT companies_company_created_by_id_5b37702d_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS companies_company_created_by_id_5b37702d
    ON public.companies_company(created_by_id);


ALTER TABLE IF EXISTS public.companies_company
    ADD CONSTRAINT companies_company_updated_by_id_2272e49b_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS companies_company_updated_by_id_2272e49b
    ON public.companies_company(updated_by_id);


ALTER TABLE IF EXISTS public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id)
    REFERENCES public.django_content_type (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS django_admin_log_content_type_id_c4bce8eb
    ON public.django_admin_log(content_type_id);


ALTER TABLE IF EXISTS public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_user_id FOREIGN KEY (user_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS django_admin_log_user_id_c564eba6
    ON public.django_admin_log(user_id);


ALTER TABLE IF EXISTS public.docs_employedocuments
    ADD CONSTRAINT docs_employedocument_employee_id_e6f755fe_fk_employees FOREIGN KEY (employee_id)
    REFERENCES public.employees_employee (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS docs_employedocuments_employee_id_e6f755fe
    ON public.docs_employedocuments(employee_id);


ALTER TABLE IF EXISTS public.employees_employee
    ADD CONSTRAINT employees_employee_created_by_id_bfa47e39_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS employees_employee_created_by_id_bfa47e39
    ON public.employees_employee(created_by_id);


ALTER TABLE IF EXISTS public.employees_employee
    ADD CONSTRAINT employees_employee_job_position_id_88a3f7ac_fk_positions FOREIGN KEY (job_position_id)
    REFERENCES public.positions_jobposition (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS employees_employee_job_position_id_88a3f7ac
    ON public.employees_employee(job_position_id);


ALTER TABLE IF EXISTS public.employees_employee
    ADD CONSTRAINT employees_employee_updated_by_id_546c8556_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS employees_employee_updated_by_id_546c8556
    ON public.employees_employee(updated_by_id);


ALTER TABLE IF EXISTS public.employees_employee
    ADD CONSTRAINT employees_employee_user_id_27bed289_fk_users_user_id FOREIGN KEY (user_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS employees_employee_user_id_key
    ON public.employees_employee(user_id);


ALTER TABLE IF EXISTS public.employees_familymember
    ADD CONSTRAINT employees_familymemb_employee_id_65f7027c_fk_employees FOREIGN KEY (employee_id)
    REFERENCES public.employees_employee (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS employees_familymember_employee_id_65f7027c
    ON public.employees_familymember(employee_id);


ALTER TABLE IF EXISTS public.employees_familymember
    ADD CONSTRAINT employees_familymember_created_by_id_2a6df659_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS employees_familymember_created_by_id_2a6df659
    ON public.employees_familymember(created_by_id);


ALTER TABLE IF EXISTS public.employees_familymember
    ADD CONSTRAINT employees_familymember_updated_by_id_8cde1b08_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS employees_familymember_updated_by_id_8cde1b08
    ON public.employees_familymember(updated_by_id);


ALTER TABLE IF EXISTS public.pays_payment
    ADD CONSTRAINT pays_payment_created_by_id_304c493f_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS pays_payment_created_by_id_304c493f
    ON public.pays_payment(created_by_id);


ALTER TABLE IF EXISTS public.pays_payment
    ADD CONSTRAINT pays_payment_employee_id_8ea59d52_fk_employees_employee_id FOREIGN KEY (employee_id)
    REFERENCES public.employees_employee (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS pays_payment_employee_id_8ea59d52
    ON public.pays_payment(employee_id);


ALTER TABLE IF EXISTS public.pays_payment
    ADD CONSTRAINT pays_payment_updated_by_id_531b3251_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS pays_payment_updated_by_id_531b3251
    ON public.pays_payment(updated_by_id);


ALTER TABLE IF EXISTS public.positions_department
    ADD CONSTRAINT positions_department_company_id_9edfde42_fk_companies FOREIGN KEY (company_id)
    REFERENCES public.companies_company (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS positions_department_company_id_9edfde42
    ON public.positions_department(company_id);


ALTER TABLE IF EXISTS public.positions_department
    ADD CONSTRAINT positions_department_created_by_id_76ca70fc_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS positions_department_created_by_id_76ca70fc
    ON public.positions_department(created_by_id);


ALTER TABLE IF EXISTS public.positions_department
    ADD CONSTRAINT positions_department_updated_by_id_458c8fd9_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS positions_department_updated_by_id_458c8fd9
    ON public.positions_department(updated_by_id);


ALTER TABLE IF EXISTS public.positions_jobposition
    ADD CONSTRAINT positions_jobpositio_department_id_0d730826_fk_positions FOREIGN KEY (department_id)
    REFERENCES public.positions_department (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS positions_jobposition_department_id_0d730826
    ON public.positions_jobposition(department_id);


ALTER TABLE IF EXISTS public.positions_jobpromotion
    ADD CONSTRAINT positions_jobpromotion_created_by_id_abedaf67_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS positions_jobpromotion_created_by_id_abedaf67
    ON public.positions_jobpromotion(created_by_id);


ALTER TABLE IF EXISTS public.positions_jobpromotion
    ADD CONSTRAINT positions_jobpromotion_updated_by_id_714188f4_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS positions_jobpromotion_updated_by_id_714188f4
    ON public.positions_jobpromotion(updated_by_id);


ALTER TABLE IF EXISTS public.products_product
    ADD CONSTRAINT products_product_created_by_id_dd4af40e_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS products_product_created_by_id_dd4af40e
    ON public.products_product(created_by_id);


ALTER TABLE IF EXISTS public.products_product
    ADD CONSTRAINT products_product_updated_by_id_33940c75_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS products_product_updated_by_id_33940c75
    ON public.products_product(updated_by_id);


ALTER TABLE IF EXISTS public.products_productimage
    ADD CONSTRAINT products_productimag_product_id_e747596a_fk_products_ FOREIGN KEY (product_id)
    REFERENCES public.products_product (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS products_productimage_product_id_e747596a
    ON public.products_productimage(product_id);


ALTER TABLE IF EXISTS public.store_sale
    ADD CONSTRAINT store_sale_created_by_id_f5a2de86_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS store_sale_created_by_id_f5a2de86
    ON public.store_sale(created_by_id);


ALTER TABLE IF EXISTS public.store_sale
    ADD CONSTRAINT store_sale_employee_id_d7b07dbb_fk_employees_employee_id FOREIGN KEY (employee_id)
    REFERENCES public.employees_employee (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS store_sale_employee_id_d7b07dbb
    ON public.store_sale(employee_id);


ALTER TABLE IF EXISTS public.store_sale
    ADD CONSTRAINT store_sale_updated_by_id_7be0717b_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS store_sale_updated_by_id_7be0717b
    ON public.store_sale(updated_by_id);


ALTER TABLE IF EXISTS public.store_saledetail
    ADD CONSTRAINT store_saledetail_created_by_id_e298b3b3_fk_users_user_id FOREIGN KEY (created_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS store_saledetail_created_by_id_e298b3b3
    ON public.store_saledetail(created_by_id);


ALTER TABLE IF EXISTS public.store_saledetail
    ADD CONSTRAINT store_saledetail_product_id_47ae00c2_fk_products_product_id FOREIGN KEY (product_id)
    REFERENCES public.products_product (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS store_saledetail_product_id_47ae00c2
    ON public.store_saledetail(product_id);


ALTER TABLE IF EXISTS public.store_saledetail
    ADD CONSTRAINT store_saledetail_sale_id_3d2cd74d_fk_store_sale_id FOREIGN KEY (sale_id)
    REFERENCES public.store_sale (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS store_saledetail_sale_id_3d2cd74d
    ON public.store_saledetail(sale_id);


ALTER TABLE IF EXISTS public.store_saledetail
    ADD CONSTRAINT store_saledetail_updated_by_id_a9694c3e_fk_users_user_id FOREIGN KEY (updated_by_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS store_saledetail_updated_by_id_a9694c3e
    ON public.store_saledetail(updated_by_id);


ALTER TABLE IF EXISTS public.token_blacklist_blacklistedtoken
    ADD CONSTRAINT token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk FOREIGN KEY (token_id)
    REFERENCES public.token_blacklist_outstandingtoken (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS token_blacklist_blacklistedtoken_token_id_key
    ON public.token_blacklist_blacklistedtoken(token_id);


ALTER TABLE IF EXISTS public.token_blacklist_outstandingtoken
    ADD CONSTRAINT token_blacklist_outs_user_id_83bc629a_fk_users_use FOREIGN KEY (user_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS token_blacklist_outstandingtoken_user_id_83bc629a
    ON public.token_blacklist_outstandingtoken(user_id);


ALTER TABLE IF EXISTS public.users_historicaluser
    ADD CONSTRAINT users_historicaluser_history_user_id_7f91d047_fk_users_user_id FOREIGN KEY (history_user_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS users_historicaluser_history_user_id_7f91d047
    ON public.users_historicaluser(history_user_id);


ALTER TABLE IF EXISTS public.users_user_groups
    ADD CONSTRAINT users_user_groups_group_id_9afc8d0e_fk_auth_group_id FOREIGN KEY (group_id)
    REFERENCES public.auth_group (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS users_user_groups_group_id_9afc8d0e
    ON public.users_user_groups(group_id);


ALTER TABLE IF EXISTS public.users_user_groups
    ADD CONSTRAINT users_user_groups_user_id_5f6f5a90_fk_users_user_id FOREIGN KEY (user_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS users_user_groups_user_id_5f6f5a90
    ON public.users_user_groups(user_id);


ALTER TABLE IF EXISTS public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_perm_permission_id_0b93982e_fk_auth_perm FOREIGN KEY (permission_id)
    REFERENCES public.auth_permission (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS users_user_user_permissions_permission_id_0b93982e
    ON public.users_user_user_permissions(permission_id);


ALTER TABLE IF EXISTS public.users_user_user_permissions
    ADD CONSTRAINT users_user_user_permissions_user_id_20aca447_fk_users_user_id FOREIGN KEY (user_id)
    REFERENCES public.users_user (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    DEFERRABLE INITIALLY DEFERRED;
CREATE INDEX IF NOT EXISTS users_user_user_permissions_user_id_20aca447
    ON public.users_user_user_permissions(user_id);