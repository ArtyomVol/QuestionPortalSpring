PGDMP                         z            QuestionsPortal    13.4    13.4 *    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    139667    QuestionsPortal    DATABASE     n   CREATE DATABASE "QuestionsPortal" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
 !   DROP DATABASE "QuestionsPortal";
                postgres    false            �            1259    139703    answer_type    TABLE     e   CREATE TABLE public.answer_type (
    id bigint NOT NULL,
    type character varying(20) NOT NULL
);
    DROP TABLE public.answer_type;
       public         heap    postgres    false            �            1259    139701    answer_type_id_seq    SEQUENCE     {   CREATE SEQUENCE public.answer_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.answer_type_id_seq;
       public          postgres    false    203            �           0    0    answer_type_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.answer_type_id_seq OWNED BY public.answer_type.id;
          public          postgres    false    202            �            1259    139715    question    TABLE       CREATE TABLE public.question (
    id bigint NOT NULL,
    from_user bigint NOT NULL,
    for_user bigint NOT NULL,
    question_text character varying(100) NOT NULL,
    answer_type_id bigint NOT NULL,
    answer_options character varying(100),
    answer character varying(100)
);
    DROP TABLE public.question;
       public         heap    postgres    false            �            1259    139759    question_answer_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.question_answer_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.question_answer_type_id_seq;
       public          postgres    false    207            �           0    0    question_answer_type_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.question_answer_type_id_seq OWNED BY public.question.answer_type_id;
          public          postgres    false    208            �            1259    139713    question_for_user_seq    SEQUENCE     ~   CREATE SEQUENCE public.question_for_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.question_for_user_seq;
       public          postgres    false    207            �           0    0    question_for_user_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.question_for_user_seq OWNED BY public.question.for_user;
          public          postgres    false    206            �            1259    139711    question_from_user_seq    SEQUENCE        CREATE SEQUENCE public.question_from_user_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.question_from_user_seq;
       public          postgres    false    207            �           0    0    question_from_user_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.question_from_user_seq OWNED BY public.question.from_user;
          public          postgres    false    205            �            1259    139709    question_id_seq    SEQUENCE     x   CREATE SEQUENCE public.question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.question_id_seq;
       public          postgres    false    207            �           0    0    question_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;
          public          postgres    false    204            �            1259    139670    user    TABLE       CREATE TABLE public."user" (
    id bigint NOT NULL,
    email character varying(29) NOT NULL,
    password character varying(32) NOT NULL,
    first_name character varying(20),
    last_name character varying(20),
    phone_number character varying(16)
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    139668    user_id_seq    SEQUENCE     t   CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public          postgres    false    201            �           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public          postgres    false    200            5           2604    139706    answer_type id    DEFAULT     p   ALTER TABLE ONLY public.answer_type ALTER COLUMN id SET DEFAULT nextval('public.answer_type_id_seq'::regclass);
 =   ALTER TABLE public.answer_type ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            6           2604    139718    question id    DEFAULT     j   ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);
 :   ALTER TABLE public.question ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    207    207            7           2604    139719    question from_user    DEFAULT     x   ALTER TABLE ONLY public.question ALTER COLUMN from_user SET DEFAULT nextval('public.question_from_user_seq'::regclass);
 A   ALTER TABLE public.question ALTER COLUMN from_user DROP DEFAULT;
       public          postgres    false    205    207    207            8           2604    139720    question for_user    DEFAULT     v   ALTER TABLE ONLY public.question ALTER COLUMN for_user SET DEFAULT nextval('public.question_for_user_seq'::regclass);
 @   ALTER TABLE public.question ALTER COLUMN for_user DROP DEFAULT;
       public          postgres    false    207    206    207            9           2604    139761    question answer_type_id    DEFAULT     �   ALTER TABLE ONLY public.question ALTER COLUMN answer_type_id SET DEFAULT nextval('public.question_answer_type_id_seq'::regclass);
 F   ALTER TABLE public.question ALTER COLUMN answer_type_id DROP DEFAULT;
       public          postgres    false    208    207            4           2604    139673    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            �          0    139703    answer_type 
   TABLE DATA           /   COPY public.answer_type (id, type) FROM stdin;
    public          postgres    false    203   6/       �          0    139715    question 
   TABLE DATA           r   COPY public.question (id, from_user, for_user, question_text, answer_type_id, answer_options, answer) FROM stdin;
    public          postgres    false    207   �/       �          0    139670    user 
   TABLE DATA           Z   COPY public."user" (id, email, password, first_name, last_name, phone_number) FROM stdin;
    public          postgres    false    201   �0       �           0    0    answer_type_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.answer_type_id_seq', 12, true);
          public          postgres    false    202            �           0    0    question_answer_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.question_answer_type_id_seq', 1, true);
          public          postgres    false    208            �           0    0    question_for_user_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.question_for_user_seq', 1, false);
          public          postgres    false    206            �           0    0    question_from_user_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.question_from_user_seq', 1, false);
          public          postgres    false    205            �           0    0    question_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.question_id_seq', 49, true);
          public          postgres    false    204            �           0    0    user_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.user_id_seq', 114, true);
          public          postgres    false    200            C           2606    139736    question UQ_question_id 
   CONSTRAINT     R   ALTER TABLE ONLY public.question
    ADD CONSTRAINT "UQ_question_id" UNIQUE (id);
 C   ALTER TABLE ONLY public.question DROP CONSTRAINT "UQ_question_id";
       public            postgres    false    207            ?           2606    139708    answer_type answer_type_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.answer_type
    ADD CONSTRAINT answer_type_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.answer_type DROP CONSTRAINT answer_type_pkey;
       public            postgres    false    203            A           2606    139786    answer_type uq_answer_type_type 
   CONSTRAINT     Z   ALTER TABLE ONLY public.answer_type
    ADD CONSTRAINT uq_answer_type_type UNIQUE (type);
 I   ALTER TABLE ONLY public.answer_type DROP CONSTRAINT uq_answer_type_type;
       public            postgres    false    203            ;           2606    139808    user user_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_email_key;
       public            postgres    false    201            =           2606    139675    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    201            D           2606    139769     question fk_question_answer_type    FK CONSTRAINT     �   ALTER TABLE ONLY public.question
    ADD CONSTRAINT fk_question_answer_type FOREIGN KEY (answer_type_id) REFERENCES public.answer_type(id) ON UPDATE CASCADE ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.question DROP CONSTRAINT fk_question_answer_type;
       public          postgres    false    207    2879    203            E           2606    139792    question fk_question_for_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.question
    ADD CONSTRAINT fk_question_for_user FOREIGN KEY (for_user) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.question DROP CONSTRAINT fk_question_for_user;
       public          postgres    false    2877    201    207            F           2606    139797    question fk_question_from_user    FK CONSTRAINT     �   ALTER TABLE ONLY public.question
    ADD CONSTRAINT fk_question_from_user FOREIGN KEY (from_user) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.question DROP CONSTRAINT fk_question_from_user;
       public          postgres    false    207    2877    201            �   U   x�3�t�HM�VHʯ�2�JL��WH*-)���2�t��M�Krg��*�d�*��V�pr���d"�q�$��r��qqq ��      �   #  x�]�Mk�0��֯Э��`;^ӞJOIc0:� ����\����8qclK��גՆ	���t�b 9+��"rt���@�%�3�lRP�`���� Ԣ1ѭ�m���>�cD�e��f���K�ڎC�꺎tz�1U8hC����\�u�����iH�$�b-Ě���v�p���Ժ�5�B���᥷�g��4��6�����oX�'���AD��He���1��z��҅{� g�J��6�t�	{���������7}���>���9m�͚h2 �~;�~      �   �   x����
�0�ϛW�&��ϭ��^�l��-�V���P��|c�����f����$jc�C�$1X˂9`��� *8�ֱ.C�A���Z	��7%:J��hs����Np�rpr��6�'�1�C�c���#�ꦕRX�F�     