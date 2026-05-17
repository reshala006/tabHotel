--
-- PostgreSQL database dump
--

\restrict ayr5vOOPZITILcebivpHdjHkbshViXjN75ehFGoID5Dozma6e1hbU309WK0vxZP

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    guest_id integer NOT NULL,
    room_id integer NOT NULL,
    check_in_date timestamp(3) without time zone NOT NULL,
    check_out_date timestamp(3) without time zone NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    total_price double precision NOT NULL,
    guest_data jsonb,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    room_type_id integer NOT NULL
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO postgres;

--
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- Name: cleaning_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cleaning_logs (
    id integer NOT NULL,
    room_id integer NOT NULL,
    maid_id integer,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status text NOT NULL,
    notes text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cleaning_logs OWNER TO postgres;

--
-- Name: cleaning_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cleaning_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cleaning_logs_id_seq OWNER TO postgres;

--
-- Name: cleaning_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cleaning_logs_id_seq OWNED BY public.cleaning_logs.id;


--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id integer NOT NULL,
    booking_id integer NOT NULL,
    amount double precision NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    method text NOT NULL,
    transaction_id text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payments_id_seq OWNER TO postgres;

--
-- Name: payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payments_id_seq OWNED BY public.payments.id;


--
-- Name: room_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.room_types (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price_per_night double precision NOT NULL,
    capacity integer NOT NULL,
    amenities text[],
    image_url text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.room_types OWNER TO postgres;

--
-- Name: room_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.room_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.room_types_id_seq OWNER TO postgres;

--
-- Name: room_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.room_types_id_seq OWNED BY public.room_types.id;


--
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    id integer NOT NULL,
    number integer NOT NULL,
    floor integer NOT NULL,
    room_type_id integer NOT NULL,
    status text DEFAULT 'available'::text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    image_urls text[]
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rooms_id_seq OWNER TO postgres;

--
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooms_id_seq OWNED BY public.rooms.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    role text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone_number text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- Name: cleaning_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs ALTER COLUMN id SET DEFAULT nextval('public.cleaning_logs_id_seq'::regclass);


--
-- Name: payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments ALTER COLUMN id SET DEFAULT nextval('public.payments_id_seq'::regclass);


--
-- Name: room_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_types ALTER COLUMN id SET DEFAULT nextval('public.room_types_id_seq'::regclass);


--
-- Name: rooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms ALTER COLUMN id SET DEFAULT nextval('public.rooms_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
305d57c0-0dfc-4a5e-a32f-a7556788830d	c8c7a6ef590a95c44f02b4c55ec35d53524d9e27035862f1abeea4d70b4f2558	2025-09-14 15:08:05.97014+03	20250914120805_init	\N	\N	2025-09-14 15:08:05.944383+03	1
b835ecb2-6436-4c1b-be92-978a5bbcd8cf	508d2b26e338bba11b6c8e49464c741780711b92f6b4f03fd90dbfef2bb81892	2025-10-06 17:27:42.09093+03	20251006142742_add_image_urls_to_room	\N	\N	2025-10-06 17:27:42.085399+03	1
dc18f0ad-e9c3-421c-820e-9dc375741f9f	9f507b56c9b22e8e5a0f4c449186f33940d275334fc3e7416882e15755cba64c	2025-10-17 15:20:26.378506+03	20251017122026_add_cleaning_log_unique_constraint	\N	\N	2025-10-17 15:20:26.372594+03	1
ba3b5a25-7397-4e32-8423-d8e06827459a	373f719acb69f8e816222f31d5f0d6bb2b493f049cb4c6502dda98efd947ea3c	2026-04-10 20:52:17.344864+03	20260410175217_fix_booking_relations	\N	\N	2026-04-10 20:52:17.338764+03	1
a44d6854-93b3-49d6-b26f-317b7f23b248	68d633d6c10069e37a485136d5d0f430ad78d78c57c30157d0915e5af5994967	2026-04-23 19:58:34.459534+03	20260423164711_change_string_to_int	\N	\N	2026-04-23 19:58:34.450472+03	1
\.


--
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, guest_id, room_id, check_in_date, check_out_date, status, total_price, guest_data, notes, created_at, updated_at, room_type_id) FROM stdin;
\.


--
-- Data for Name: cleaning_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cleaning_logs (id, room_id, maid_id, date, status, notes, created_at) FROM stdin;
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, booking_id, amount, status, method, transaction_id, created_at) FROM stdin;
\.


--
-- Data for Name: room_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_types (id, name, description, price_per_night, capacity, amenities, image_url, created_at) FROM stdin;
2	economy-solo-x2	Два одноместных номера категории «Эконом» рядом, идеально для друзей или коллег.	3000	2	{}	/uploads/rooms/4/bedroom-first.webp	2025-10-07 08:01:08.607
3	economy-duo	Двухместный номер эконом-класса с одной двуспальной кроватью и всем необходимым для отдыха.	4000	2	{}	/uploads/rooms/7/bedroom-first.webp	2025-10-07 08:02:37.695
4	comfort-solo	Уютный одноместный номер с улучшенным интерьером и одной удобной кроватью.	4000	1	{}	/uploads/rooms/10/bedroom-first.webp	2025-10-18 11:44:42.309
5	comfort-solo-x2	Номер категории «Комфорт» с двумя отдельными кроватями и современным оформлением.	5000	2	{}	/uploads/rooms/13/bedroom-first.webp	2025-10-18 11:45:21.332
6	comfort-duo	Просторный двухместный номер категории «Комфорт» с одной большой двуспальной кроватью.	6000	2	{}	/uploads/rooms/16/bedroom-first.webp	2025-10-18 11:45:57.112
8	luxuary-solo-x2	Номер премиум-класса с двумя отдельными кроватями и изысканным интерьером.	7000	2	{}	/uploads/rooms/22/bedroom-first.webp	2025-10-18 11:48:36.783
9	luxuary-duo	Роскошный двухместный номер с одной большой кроватью, зоной отдыха и расширенными удобствами.	8000	2	{}	/uploads/rooms/25/bedroom-first.webp	2025-10-18 11:49:10.787
7	luxuary-solo	Одноместный номер премиум-класса с высоким уровнем комфорта и одной кроватью.	6000	1	{}	/uploads/rooms/19/bedroom-first.webp	2025-10-18 11:48:17.402
1	economy-solo	Одноместный номер эконом-класса с одной кроватью и базовыми удобствами.	2000	1	{}	/uploads/rooms/1/bedroom-first.webp	2025-10-07 08:00:16.95
\.


--
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (id, number, floor, room_type_id, status, created_at, image_urls) FROM stdin;
25	16	6	6	available	2025-10-18 12:06:56.637	{/uploads/rooms/16/bathroom.webp,/uploads/rooms/16/bedroom-first.webp,/uploads/rooms/16/bedroom-second.webp}
5	1	1	1	available	2025-10-18 11:39:17.015	{/uploads/rooms/1/bathroom.webp,/uploads/rooms/1/bedroom-first.webp,/uploads/rooms/1/bedroom-second.webp}
31	22	8	8	available	2025-10-18 12:13:49.753	{/uploads/rooms/22/bathroom.webp,/uploads/rooms/22/bedroom-first.webp,/uploads/rooms/22/bedroom-second.webp,/uploads/rooms/22/recreation-area-first.webp,/uploads/rooms/22/recreation-area-second.webp}
15	6	2	2	available	2025-10-18 12:03:17.217	{/uploads/rooms/6/bathroom.webp,/uploads/rooms/6/bedroom-first.webp,/uploads/rooms/6/bedroom-second.webp}
34	25	9	9	cleaning	2025-10-18 12:14:11.18	{/uploads/rooms/25/bathroom.webp,/uploads/rooms/25/bedroom-first.webp,/uploads/rooms/25/bedroom-second.webp,/uploads/rooms/25/recreation-area-first.webp,/uploads/rooms/25/recreation-area-second.webp}
9	4	2	2	available	2025-10-18 12:00:49.829	{/uploads/rooms/4/bathroom.webp,/uploads/rooms/4/bedroom-first.webp,/uploads/rooms/4/bedroom-second.webp}
32	23	8	8	available	2025-10-18 12:13:49.753	{/uploads/rooms/23/bathroom.webp,/uploads/rooms/23/bedroom-first.webp,/uploads/rooms/23/bedroom-second.webp,/uploads/rooms/23/recreation-area-first.webp,/uploads/rooms/23/recreation-area-second.webp}
14	5	2	2	available	2025-10-18 12:03:07.571	{/uploads/rooms/5/bathroom.webp,/uploads/rooms/5/bedroom-first.webp,/uploads/rooms/5/bedroom-second.webp}
17	8	3	3	available	2025-10-18 12:04:13.141	{/uploads/rooms/8/bathroom.webp,/uploads/rooms/8/bedroom-first.webp,/uploads/rooms/8/bedroom-second.webp}
33	24	8	8	available	2025-10-18 12:13:49.753	{/uploads/rooms/24/bathroom.webp,/uploads/rooms/24/bedroom-first.webp,/uploads/rooms/24/bedroom-second.webp,/uploads/rooms/24/recreation-area-first.webp,/uploads/rooms/24/recreation-area-second.webp}
18	9	3	3	available	2025-10-18 12:04:13.141	{/uploads/rooms/9/bathroom.webp,/uploads/rooms/9/bedroom-first.webp,/uploads/rooms/9/bedroom-second.webp}
19	10	4	4	available	2025-10-18 12:05:55.593	{/uploads/rooms/10/bathroom.webp,/uploads/rooms/10/bedroom-first.webp,/uploads/rooms/10/bedroom-second.webp}
20	11	4	4	available	2025-10-18 12:05:55.593	{/uploads/rooms/11/bathroom.webp,/uploads/rooms/11/bedroom-first.webp,/uploads/rooms/11/bedroom-second.webp}
21	12	4	4	available	2025-10-18 12:05:55.593	{/uploads/rooms/12/bathroom.webp,/uploads/rooms/12/bedroom-first.webp,/uploads/rooms/12/bedroom-second.webp}
35	26	9	9	available	2025-10-18 12:14:11.18	{/uploads/rooms/26/bathroom.webp,/uploads/rooms/26/bedroom-first.webp,/uploads/rooms/26/bedroom-second.webp,/uploads/rooms/26/recreation-area-first.webp,/uploads/rooms/26/recreation-area-second.webp}
22	13	5	5	available	2025-10-18 12:06:28.504	{/uploads/rooms/13/bathroom.webp,/uploads/rooms/13/bedroom-first.webp,/uploads/rooms/13/bedroom-second.webp}
26	17	6	6	available	2025-10-18 12:06:56.637	{/uploads/rooms/17/bathroom.webp,/uploads/rooms/17/bedroom-first.webp,/uploads/rooms/17/bedroom-second.webp}
27	18	6	6	available	2025-10-18 12:06:56.637	{/uploads/rooms/18/bathroom.webp,/uploads/rooms/18/bedroom-first.webp,/uploads/rooms/18/bedroom-second.webp}
29	20	7	7	available	2025-10-18 12:07:27.03	{/uploads/rooms/20/bathroom.png,/uploads/rooms/20/bedroom-first.webp,/uploads/rooms/20/bedroom-second.webp,/uploads/rooms/20/recreation-area-first.webp,/uploads/rooms/20/recreation-area-second.webp}
30	21	7	7	available	2025-10-18 12:07:27.03	{/uploads/rooms/21/bathroom.webp,/uploads/rooms/21/bedroom-first.webp,/uploads/rooms/21/bedroom-second.webp,/uploads/rooms/21/recreation-area-first.webp,/uploads/rooms/21/recreation-area-second.webp}
36	27	9	9	available	2025-10-18 12:14:11.18	{/uploads/rooms/27/bathroom.webp,/uploads/rooms/27/bedroom-first.webp,/uploads/rooms/27/bedroom-second.webp,/uploads/rooms/27/recreation-area-first.webp,/uploads/rooms/27/recreation-area-second.webp}
16	7	3	3	available	2025-10-18 12:03:52.152	{/uploads/rooms/7/bathroom.webp,/uploads/rooms/7/bedroom-first.webp,/uploads/rooms/7/bedroom-second.webp}
6	2	1	1	available	2025-10-18 11:40:19.601	{/uploads/rooms/2/bathroom.webp,/uploads/rooms/2/bedroom-first.webp,/uploads/rooms/2/bedroom-second.webp}
24	15	5	5	available	2025-10-18 12:06:28.504	{/uploads/rooms/15/bathroom.webp,/uploads/rooms/15/bedroom-first.webp,/uploads/rooms/15/bedroom-second.webp}
23	14	5	5	available	2025-10-18 12:06:28.504	{/uploads/rooms/14/bathroom.webp,/uploads/rooms/14/bedroom-first.webp,/uploads/rooms/14/bedroom-second.webp}
28	19	7	7	available	2025-10-18 12:07:27.03	{/uploads/rooms/19/bathroom.webp,/uploads/rooms/19/bedroom-first.webp,/uploads/rooms/19/bedroom-second.webp,/uploads/rooms/19/recreation-area-first.webp,/uploads/rooms/19/recreation-area-second.webp}
7	3	1	1	available	2025-10-18 11:42:36.637	{/uploads/rooms/3/bathroom.webp,/uploads/rooms/3/bedroom-first.webp,/uploads/rooms/3/bedroom-second.webp}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password_hash, role, first_name, last_name, phone_number, created_at, updated_at) FROM stdin;
11	guest1@mail.ru	$2b$12$.BsuZ6Fk3TqnjXxa34lPjOlfmLnmUI6yKG46uVhTgD34vyqmiygka	guest	Ибрагим	Рагимов	89253457684	2025-09-26 18:19:06.46	2025-09-26 18:19:06.46
13	manager1@mail.ru	$2b$12$RmAYP44bY.zQBWAV/Tb.YujRBLafbvxYQOvj9z2Y0Ozi3oG/RIsey	manager	Дмитрий	Нагиев	89252948576	2025-09-26 18:20:36.419	2025-09-26 18:20:36.419
14	theMaid1@mail.ru	$2b$12$qHTDp0SCbZqybP8bRBcFv.HOXeEIsHVILtdtPXao9KqsCy18hmtYe	maid	Лида	Петровна	89251286593	2025-09-26 18:21:49.953	2025-09-26 18:21:49.953
12	guest2@mail.ru	$2b$12$8Sj4b1YVq47MvJUX31SQ3.Cpo3.BUrHMsHFzFnfsZ/UtTNHfNlKYm	guest	Ахмад	Магомедов	89253428694	2025-09-26 18:19:35.582	2026-05-14 13:59:20.909
6	admin1@mail.ru	$2b$12$kNX0Bg/BzP3dRbapS4MW9OvSLfuo6/B/Upv/BCoFX36bJUaKvycKK	admin	Rasul	Aliev	89253457685	2025-09-26 17:38:42.695	2026-05-14 15:56:39.512
\.


--
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 240, true);


--
-- Name: cleaning_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cleaning_logs_id_seq', 14, true);


--
-- Name: payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payments_id_seq', 1, false);


--
-- Name: room_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_types_id_seq', 9, true);


--
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_id_seq', 36, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- Name: cleaning_logs cleaning_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT cleaning_logs_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: room_types room_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_types
    ADD CONSTRAINT room_types_pkey PRIMARY KEY (id);


--
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cleaning_logs_room_id_date_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cleaning_logs_room_id_date_key ON public.cleaning_logs USING btree (room_id, date);


--
-- Name: rooms_number_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX rooms_number_key ON public.rooms USING btree (number);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: bookings bookings_guest_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_guest_id_fkey FOREIGN KEY (guest_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bookings bookings_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bookings bookings_room_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_room_type_id_fkey FOREIGN KEY (room_type_id) REFERENCES public.room_types(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cleaning_logs cleaning_logs_maid_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT cleaning_logs_maid_id_fkey FOREIGN KEY (maid_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: cleaning_logs cleaning_logs_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT cleaning_logs_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: payments payments_booking_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES public.bookings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rooms rooms_room_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_room_type_id_fkey FOREIGN KEY (room_type_id) REFERENCES public.room_types(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict ayr5vOOPZITILcebivpHdjHkbshViXjN75ehFGoID5Dozma6e1hbU309WK0vxZP

