--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    photo text NOT NULL,
    category text NOT NULL,
    price numeric(10,2) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "userId" integer
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phone integer NOT NULL,
    cpf integer NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products VALUES (1, 'crossbody bag', 'crossbody bag quadro', 'data:image/jpeg;base64,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', 'roupas', 299.90, true, 1);
INSERT INTO public.products VALUES (3, 'bone class', 'bone class', 'data:image/jpeg;base64,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', 'roupa', 149.90, true, 3);
INSERT INTO public.products VALUES (2, 'blusa', 'blusa do brasil ', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShWDX8ZAVhGiE0xqSaVVqRSEB-MRHAiZQtCg&usqp=CAU', 'roupa', 89.90, true, 1);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'eca28a60-16dc-406a-b9b7-b0411f67d803', 1);
INSERT INTO public.sessions VALUES (2, 'bcf4b4c7-8d7e-4641-911e-10647759c69f', 2);
INSERT INTO public.sessions VALUES (3, '7ac54172-70de-4390-a533-6919b088f570', 3);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'fai', 'fai@fai.com', '$2b$10$HFKR.4HO9Ls/8k.TLUGVG.8qWlW3lKoNRACpzmCbrBN0eZqdYD1LC', 123456789, 12345);
INSERT INTO public.users VALUES (2, 'mat', 'mat@mat.com', '$2b$10$Ex3JBeO72jOPptR8ikSs9eSdnQhbykzvOBtnE/tW8phcEQ4A53O5K', 123456789, 12345);
INSERT INTO public.users VALUES (3, 'faissal', 'faissal@faissal.com', '$2b$10$1vwe.o.YHrsvrA9thnA3veweLBJL6FAB89/qzGlUE9tSJeAQnGT2i', 123456789, 12345);
INSERT INTO public.users VALUES (4, 'vk', 'vk@vk.com', '$2b$10$kubB1QyVYYLdYJ7MqSpN9usfHI3Dga9v8v8twWLwVhTyfwgONJ6eu', 123456789, 12345);
INSERT INTO public.users VALUES (5, 'mat', 'mat@mateus.com', '$2b$10$KUDzuQdmr4297vrxBy13VONf0JtgTKI3luPlMpMh/zwKx7ksZUsIS', 123456789, 12345);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: products products_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

